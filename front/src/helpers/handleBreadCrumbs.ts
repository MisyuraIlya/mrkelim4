import { documentTypes } from '../enums/documentsTypes'

export const findCategoryTitleById = (
  categoryId: number | undefined,
  categories: ICategory[]
): string | undefined => {
  const findTitle = (
    id: number | undefined,
    categoryList: ICategory[]
  ): string | undefined => {
    for (const category of categoryList) {
      if (category.id === id) {
        return category.title
      }

      if (category.categories && category.categories.length > 0) {
        const foundTitle = findTitle(id, category.categories)
        if (foundTitle !== undefined) {
          return foundTitle
        }
      }
    }

    return undefined
  }

  if (categoryId !== undefined && categories.length > 0) {
    return findTitle(categoryId, categories)
  }

  return undefined
}

export const findDocumentTypeTitle = (
  value: IDocumentTypes | undefined
): string => {
  let result = ''
  documentTypes?.map((item) => {
    if (value === item.value) {
      result = item.label
    }
  })
  return result
}
