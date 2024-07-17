import { create } from 'zustand'
import CartServices from '../services/cart.services'
import { onErrorAlert, onSuccessAlert } from '../utils/MySweetAlert'
import moment from 'moment'
import { AdminOrderService } from '../services/admin/AdminOrders.service'
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware'

interface useCartState {
  loading: boolean
  setLoading: (loading: boolean) => void
  // ========== HANDLE CART ==========
  cart: ICart[]
  setCart: (data: ICart[]) => void
  getCartItem: (product: { sku: string }) => ICart | null
  addToCart: (product: IProduct) => void
  increaseCart: (sku: string) => void
  decreaseCart: (sku: string) => void
  deleteFromCart: (sku: string) => void
  changeQuantity: (sku: string, quantity: number) => void
  changePrice: (cartItem: ICart, value: number) => void
  changeDiscount: (cartItem: ICart, value: number) => void
  changeSum: (cartItem: ICart, value: number) => void
  // ========== HANDLE CART ==========

  // ========== CART PAGE ==========
  selectedMode: IDocumentMode
  modes: IDocumentMode[]
  comment: string
  setSelectedMode: (type: IDocumentMode) => void
  setComment: (value: string) => void
  // ========== CART PAGE ==========

  // ========== MAIN FUNCTIONS ==========
  sendOrder: (
    user: IUser,
    agent?: IUser | null,
    discountUser?: number,
    isSendToErp?: boolean
  ) => Promise<SendOrderResponse>
  saveDraft: (user: IUser) => void
  // ========== MAIN FUNCTIONS ==========
}

export const useCart = create(
  persist(
    (set, get) => ({
      loading: false,
      setLoading: (loading) => set({ loading }),
      // ========== HANDLE CART ==========
      cart: [],
      setCart: (data: ICart[]) => {
        set({ cart: data })
      },

      getCartItem: (product): ICart | null => {
        const cart = get().cart
        const itemFind = cart.filter((item) => item.sku === product.sku)
        if (itemFind.length > 0) {
          return itemFind[0]
        } else {
          return null
        }
      },

      addToCart: (product: IProduct) => {
        console.log('product', product)

        const { cart } = get()
        const cartProduct = {
          sku: product.sku,
          quantity: 1,
          product: product,
          stock: product.stock,
          price: product.finalPrice,
          discount: product.discount,
          total: 1 * product.finalPrice,
          choosedPackQuantity:
            product?.packProducts?.[0]?.pack?.quantity ??
            product?.packQuantity ??
            1,
        }

        set({ cart: [...cart, cartProduct] })
      },
      increaseCart: (sku) => {
        const cart = get().cart
        const itemIndex = cart.findIndex((item) => item.sku === sku)
        if (itemIndex !== -1) {
          cart[itemIndex].quantity += 1
          cart[itemIndex].total =
            cart[itemIndex].quantity * cart[itemIndex].price
        } else {
          console.error('Item not found in cart')
        }
        set({ cart })
      },
      decreaseCart: (sku) => {
        const cart = get().cart
        const itemIndex = cart.findIndex((item) => item.sku === sku)
        if (itemIndex !== -1) {
          cart[itemIndex].quantity -= 1
          cart[itemIndex].total =
            cart[itemIndex].quantity * cart[itemIndex].price
        } else {
          console.error('Item not found in cart')
        }
        set({ cart })
      },
      deleteFromCart: (sku) => {
        const cart = get().cart
        const filtered = cart.filter((item) => item.sku !== sku)
        set({ cart: filtered })
      },
      changeQuantity: (sku, quantity) => {
        const cart = get().cart
        const itemIndex = cart.findIndex((item) => item.sku === sku)
        if (itemIndex !== -1) {
          cart[itemIndex].quantity = +quantity
          cart[itemIndex].total = +quantity * cart[itemIndex].price
        } else {
          console.error('Item not found in cart')
        }
        set({ cart })
      },

      // AGENT
      changePrice: (cartItem: ICart, value: number) => {
        if (
          cartItem.product.minimumPrice &&
          cartItem.product.finalPrice > cartItem.product.minimumPrice
        ) {
          if (cartItem.product.minimumPrice > value) {
            onErrorAlert('מחיר נמוך מדיי', '')
            return false
          }
        }

        const updatedProduct = { ...cartItem.product, finalPrice: value }
        const discountedPrice = value - (value * cartItem.discount) / 100
        const updatedCartItem = {
          ...cartItem,
          price: discountedPrice,
          product: updatedProduct,
        }
        updatedCartItem.total = updatedCartItem.quantity * discountedPrice
        set((state) => ({
          cart: state.cart.map((item) =>
            item === cartItem ? updatedCartItem : item
          ),
        }))
      },

      changeDiscount: (cartItem: ICart, value: number) => {
        const clampedDiscount = Math.max(0, Math.min(value, 100))
        const updatedCartItem = { ...cartItem, discount: clampedDiscount }
        const discountedPrice =
          updatedCartItem.product.finalPrice -
          (updatedCartItem.product.finalPrice * clampedDiscount) / 100
        updatedCartItem.price = +discountedPrice.toFixed(2)
        updatedCartItem.total = +(
          updatedCartItem.quantity * discountedPrice
        ).toFixed(2)

        if (
          cartItem.product.minimumPrice &&
          cartItem.product.finalPrice > cartItem.product.minimumPrice
        ) {
          if (cartItem.product.minimumPrice > updatedCartItem.price) {
            onErrorAlert('מחיר ליחידה נמוך מדיי', '')
            return false
          }
        }

        set((state) => ({
          cart: state.cart.map((item) =>
            item === cartItem ? updatedCartItem : item
          ),
        }))
      },

      changeSum: (cartItem: ICart, value: number) => {
        if (
          cartItem.product.minimumPrice &&
          cartItem.product.finalPrice > cartItem.product.minimumPrice
        ) {
          if (cartItem.product.minimumPrice > value) {
            onErrorAlert('מחיר נמוך מדיי', '')
            return false
          }
        }

        const updatedCartItem = { ...cartItem, price: value }
        const discount =
          ((cartItem.product.finalPrice - value) /
            cartItem.product.finalPrice) *
          100
        updatedCartItem.discount = +discount.toFixed(2)
        updatedCartItem.total = updatedCartItem.quantity * value

        set((state) => ({
          cart: state.cart.map((item) =>
            item === cartItem ? updatedCartItem : item
          ),
        }))
      },

      // ========== HANDLE CART ==========

      // ========== CART PAGE ==========
      selectedMode: {
        value: 'order' as IDocumentType,
        label: 'הזמנה',
        isOnlyAgent: false,
      },
      setSelectedMode: (type: IDocumentMode) => set({ selectedMode: type }),
      modes: [
        { value: 'order' as IDocumentType, label: 'הזמנה', isOnlyAgent: false },
        {
          value: 'quote' as IDocumentType,
          label: 'ה.מחיר',
          isOnlyAgent: false,
        },
        { value: 'return' as IDocumentType, label: 'שחזור', isOnlyAgent: true },
      ],

      comment: '',
      setComment: (value) => set({ comment: value }),
      // ========== CART PAGE ==========

      // ========== MAIN FUNCTIONS ==========

      sendOrder: async (
        user: IUser,
        agent?: IUser | null,
        discountUser?: number,
        isSendToErp?: boolean
      ) => {
        const response = await CartServices.CreateOrder(
          get().cart,
          get().comment,
          user,
          get().selectedMode.value,
          settings.deliveryPrice,
          discountUser,
          agent,
          isSendToErp
        )

        return response
      },

      saveDraft: async (user: IUser) => {
        const cart = get().cart
        try {
          set({ loading: true })
          const totalPrice = cart.reduce(
            (acc, item) => acc + item.quantity * item.price,
            0
          )
          //  @ts-ignore
          const objHistory: IHistory = {
            //  @ts-ignore
            user: `/api/users/${user?.id}`,
            total: totalPrice,
            orderStatus: 'draft',
            createdAt: moment().format('YYYY-MM-DD'),
            updatedAt: moment().format('YYYY-MM-DD'),
            isSendErp: false,
            isBuyByCreditCard: false,
            //  @ts-ignore
            agent: null,
            documentType: 'draft',
          }

          const historyId = await AdminOrderService.createHistory(objHistory)
          cart.map(async (item) => {
            let objDetailed: IDocument = {
              //  @ts-ignore
              history: `/api/histories/${historyId.id}`,
              //  @ts-ignore
              product: `/api/products/${item.product.id}`,
              singlePrice: item.price,
              quantity: item.quantity,
              discount: 0,
              total: item.total,
            }
            await AdminOrderService.createHistoryDetailed(objDetailed)
          })
        } catch (e) {
          console.log('[ERROR]', e)
        } finally {
          set({ loading: false })
        }
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<useCartState, useCartState>
  )
)
