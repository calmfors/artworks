import Prismic from 'prismic-javascript'

// -- Prismic API endpoint
// Determines which repository to query and fetch data from
export const apiEndpoint = 'https://tristest.cdn.prismic.io/api/v2'

// -- Access Token if the repository is not public
// Generate a token in your dashboard and configure it here if your repository is private
const accessToken = ''

// -- Link resolution rules
// Manages the url links to internal Prismic documents
export const linkResolver = (doc) => {
  console.log(doc)
  if (doc.type === 'page') return `/page/${doc.uid}`
  if (doc.type === 'category') return `/trisvonnamichell/works:${doc.slug}`
  if (doc.type === 'blog') return `/trisvonnamichell/works:${doc.slug}`


  return '/'
}

// Client method to query documents from the Prismic repo
export const client = Prismic.client(apiEndpoint, { accessToken })
