// const path = require(`path`)

// exports.createPages = ({ graphql, actions }) => {
//    const {createPage} = actions
//    const result = await graphql(`
//       {
//          allDatoCmsProject {
//             edges {
//                node {
//                   slug
//                }
//             }
//          }
//       }
//    `)

//    result.data.allDatoCmsProject.edges.forEach(({ node }) => {
//       createPage({
//          path: `/project/${node.slug}`,
//          component: path.resolve(`./src/templates/productCategories.js`),
//          context: {
//             slug: node.slug,
//          },
//       })
//    })
// }
