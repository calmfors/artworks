// In src/pages/Page.js
import React, { useEffect, useState } from 'react'
import { Link, RichText } from 'prismic-reactjs'
import { client, linkResolver } from '../prismic-configuration'
import NotFound from './NotFound'

const Page = ({ match }) => {
    //console.log(match)
    const [doc, setDocData] = useState(null)
    const [notFound, toggleNotFound] = useState(false)

    const uid = match.params.uid

    // Get the page document from Prismic
    useEffect(() => {
        // let tags = []

        const fetchData = async () => {
            // We are using the function to get a document by its UID
            const result = await client.getByUID('page', uid)

            if (result) {
                // We use the State hook to save the document
                //console.log(result)

                //result.data.body.map((item, i) => tags.push(item.primary.link.tags[0]))
                //tags = [...new Set(tags)];
                console.log(result)
                //result.tag = tags[0]

                return setDocData(result)

            } else {
                // Otherwise show an error message
                console.warn('Page document not found. Make sure it exists in your Prismic repository')
                toggleNotFound(true)
            }

        }
        fetchData()

    }, [uid]) // Skip the Effect hook if the UID hasn't changed

    if (doc) {
        return (
            <div className="page">
                {/* This is how to render a Rich Text field as plain text */}
                <h1>{RichText.asText(doc.data.title)}</h1>
                {/* This is how to render a Rich Text field into your template as HTML */}
                <RichText render={doc.data.description} linkResolver={linkResolver} />
                {doc.data.body.map((item, i) => <a href={Link.url(item.primary.link, linkResolver)} tag={item.primary.link.tags[0]} key={i}>{item.primary.link.tags[0]}<br /></a>)
                }
                {doc.data.catlink.map((item, i) => <a href={Link.url(item.category, linkResolver)} key={'a' + i}>{item.work_title[0].text}<br /></a>)

                }
                {/* <a href={Link.url(doc.data.catlink, linkResolver)}>{doc.data.catlink.slug}</a> */}
                {/* This is how to get an image into your template */}
                <img src={doc.data.image.url} alt={doc.data.image.alt} />

            </div>
        )
    } else if (notFound) {
        return <NotFound />
    }
    return null
}

export default Page