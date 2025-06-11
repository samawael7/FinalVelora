export const productsEndpoints = {
  getAll: "/Products",
  getById: (id) => `/Products/${id}`,
  getByConcern: (concern) => `/Products?concern=${concern}`,
  getPaginated: (pageIndex, pageSize) =>
    `/Products?pageIndex=${pageIndex}&pageSize=${pageSize}`,
  getBestSeller: () => "/Products?isBestSeller=true",
  getNewArrivals: () => "/Products?sort=newest",
  getBySkinType: (skinType) => `/Products?skinType=${skinType}`,
  getByCategory: (category) => `/Products?productCategory=${category}`,
};
