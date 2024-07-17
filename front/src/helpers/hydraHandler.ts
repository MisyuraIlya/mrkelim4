export const HydraHandler = {
  paginationHandler(hydraView: Hydra): hydraPagination {
    let totalPages = '1'
    let page = '1'
    let lastPage = '1'
    let nextPage = '1'
    let previous = '1'
    if (hydraView['hydra:view']) {
      if (hydraView['hydra:view']['hydra:last']) {
        totalPages = (hydraView['hydra:view']['hydra:last']?.split('page='))[1]
      }

      if (hydraView['hydra:view']['@id']) {
        const pageCurrent = (hydraView['hydra:view']['@id']?.split('page='))[1]
        if (pageCurrent) {
          page = pageCurrent
        }
      }

      if (hydraView['hydra:view']['hydra:last']) {
        const last = (hydraView['hydra:view']['hydra:last']?.split('page='))[1]
        if (last) {
          lastPage = last
        }
      }

      if (hydraView['hydra:view']['hydra:next']) {
        const next = (hydraView['hydra:view']['hydra:next']?.split('page='))[1]
        if (next) {
          nextPage = next
        }
      } else {
        if (hydraView['hydra:view']['hydra:last']) {
          const next =
            (hydraView['hydra:view']['hydra:last']?.split('page='))[1]
          nextPage = next
        }
      }

      if (hydraView['hydra:view']['hydra:previous']) {
        const previousPage =
          (hydraView['hydra:view']['hydra:previous']?.split('page='))[1]
        previous = previousPage
      }
    }

    return { totalPages, page, lastPage, nextPage, previous }
  },
}
