import React, { useCallback, useState, useLayoutEffect } from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
// import store
import { useStore } from "../../store/useStore"

// ************
// component
// ************

const Background = ({ path }) => {
  const { allDatoCmsProductImage } = useStaticQuery(query)
  const categories = allDatoCmsProductImage.edges.map(edge => edge.node)

  const { state } = useStore()
  const [categoryIndex, setCategoryIndex] = useState(activeCategoryIndex())
  const [backgroundIndex, setBackgroundIndex] = useState(0)
  const [initialImageLoaded, setInitialImageLoaded] = useState(false)

  // match activeCategoryIndex to product image category
  function activeCategoryIndex() {
    return categories.findIndex(item =>
      item.title
        .toLowerCase()
        .includes(
          !path.includes("/products") || state?.activeCategory === "tea"
            ? "all tea"
            : state?.activeCategory
        )
    )
  }

  // data structure
  // [category] = [img][img][img]
  // [category] = [img][img][img]
  // [category] = [img][img][img]
  const backgroundMap = categories.map((category, index1) => {
    return (
      <ToggleCategory
        key={index1}
        className={categoryIndex === index1 ? "active" : ""}
      >
        <Category
          key={index1}
          className={categoryIndex === index1 ? "active" : ""}
        >
          {category.imageGallery.map((img, index2) => {
            return (
              <ToggleImage
                key={index2}
                className={backgroundIndex === index2 ? "active" : ""}
              >
                <ImageWrapper
                  key={index2}
                  className={backgroundIndex === index2 ? "active" : ""}
                >
                  <Image
                    key={index2}
                    title={img.title}
                    alt={img.alt}
                    fluid={{ ...img.fluid }}
                    fadeIn={true}
                    durationFadeIn={1000}
                    onLoad={() => setInitialImageLoaded(true)}
                    {...{ initialImageLoaded }}
                  />
                </ImageWrapper>
              </ToggleImage>
            )
          })}
        </Category>
      </ToggleCategory>
    )
  })

  // cycle through landing background
  const cycleBg = useCallback(
    (activeGalleryLength, categoryIndex) => {
      // pick new random index
      const randomIndex = Math.floor(
        Math.random() * Math.floor(activeGalleryLength)
      )

      // check if new random index equals current index
      const newIndex =
        randomIndex === backgroundIndex
          ? (backgroundIndex + 1) % activeGalleryLength
          : randomIndex

      setBackgroundIndex(newIndex)
    },
    [backgroundIndex]
  )

  // effect to set background category
  // effect resets cycle upon changing activeCategory
  useLayoutEffect(() => {
    const activeGalleryLength =
      categories[activeCategoryIndex()].imageGallery.length

    // set activeCategoryIndex() on page or activeCategory change
    setCategoryIndex(activeCategoryIndex())

    // set backgroundIndex if greater than or equal to new activeGalleryLength
    // [x, y, z].length === 3.  Index of 3 does not exist.
    if (backgroundIndex >= activeGalleryLength) {
      cycleBg(activeGalleryLength, activeCategoryIndex())
    }
    // set cycle interval
    const backgroundInterval = setInterval(
      () => cycleBg(activeGalleryLength, activeCategoryIndex()),
      8000
    )

    // clear interval upon changing product category
    return () => clearInterval(backgroundInterval)
  }, [path, state?.activeCategory, backgroundIndex, cycleBg, categories])

  return <Images>{backgroundMap}</Images>
}
Background.propTypes = {}
export default Background

// ************
// styles
// ************

// components listed outside to inside
const Images = styled.div``
const FadeAnim = styled.div`
  visibility: ${props => (props.className === "active" ? "visible" : "hidden")};
  opacity: ${props => (props.className === "active" ? 1 : 0)};
  transition: opacity 2000ms, visibility 2000ms;
`
// toggleDisplay moves unused images out of viewport so that they lazyload
// separate component so transition doesn't affect other attributes
const ToggleDisplay = styled.div`
  position: fixed;
  left: 9999px;
  top: 0;
  height: 100%;
  width: 100%;
  /* left transition is delayed on way out and is instant coming back in */
  transition-delay: 2000ms;

  &.active {
    left: 0;
    transition-delay: 0ms;
  }
`
const ToggleCategory = styled(ToggleDisplay)``
const Category = styled(FadeAnim)``
const ToggleImage = styled(ToggleDisplay)`
  position: absolute;
`
const ImageWrapper = styled(FadeAnim)`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 0;
`
const Image = styled(Img)`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  visibility: ${props =>
    props.initialImageLoaded === true ? "visible" : "hidden"};
  opacity: ${props => (props.initialImageLoaded === true ? 1 : 0)};
  transition: opacity 2000ms, visibility 2000ms;
`

// ************
// query
// ************

const query = graphql`
  {
    allDatoCmsProductImage {
      edges {
        node {
          title
          imageGallery {
            alt
            title
            fluid(imgixParams: { auto: "format, compress", maxW: 2560 }) {
              ...GatsbyDatoCmsFluid
            }
          }
        }
      }
    }
  }
`
