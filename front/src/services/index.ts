import admin from './admin'
import agents from './agents'
import { AuthService } from './auth.service'
import CartServices from './cart.services'
import { CatalogServices } from './catalog.service'
import { notifications } from './notifications.service'
import { DocumentsService } from './document.service'
import { OneSignalService } from './oneSignal.service'
export default {
  Admin: admin,
  Agents: agents,
  AuthService: AuthService,
  CartService: CartServices,
  CatalogService: CatalogServices,
  Notifications: notifications,
  DocumentsService: DocumentsService,
  OneSignalService,
}
