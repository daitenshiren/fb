
const routes = [
  {
    path: '/test',
    component: () => import('pages/Test.vue'),
  },
  {
    path: '/',
    component: () => import('layouts/EditorLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
