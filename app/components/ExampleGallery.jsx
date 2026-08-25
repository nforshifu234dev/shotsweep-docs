'use client'

import { useEffect, useState } from 'react'
import { ExampleImage } from './ExampleImage.jsx'

/**
 * Documentation image viewer/gallery.
 *
 * Supports either:
 *
 *   <ExampleGallery
 *     src="/image.png"
 *     alt="..."
 *     width={1536}
 *     height={1024}
 *   />
 *
 * or multiple images:
 *
 *   <ExampleGallery
 *     images={[
 *       { src: "/one.png", alt: "..." },
 *       { src: "/two.png", alt: "..." }
 *     ]}
 *   />
 *
 * A single image behaves as a click-to-open lightbox.
 * Multiple images additionally support previous/next navigation.
 *
 * @param {Object} props
 * @param {string} [props.src] - Source for a single image.
 * @param {string} [props.alt] - Alt text for a single image.
 * @param {number} [props.width] - Intrinsic width for a single image.
 * @param {number} [props.height] - Intrinsic height for a single image.
 * @param {string} [props.caption] - Caption for a single image.
 * @param {Array<Object>} [props.images] - Multiple gallery images.
 * @param {string} [props.note] - Optional note displayed below the image(s).
 * @param {number} [props.columns=2] - Number of gallery columns.
 *
 * @returns {JSX.Element}
 */
export function ExampleGallery({
  src,
  alt,
  width,
  height,
  caption,
  images,
  note,
  columns = 2,
  flush = false
}) {
  const [activeIndex, setActiveIndex] = useState(null)
  const [zoom, setZoom] = useState(1)

  /*
   * Support both the simple single-image API and the
   * multiple-image gallery API.
   */
  const galleryImages =
    Array.isArray(images) && images.length > 0
      ? images
      : src
        ? [
            {
              src,
              alt,
              width,
              height,
              caption
            }
          ]
        : []

  const isOpen = activeIndex !== null
  const activeImage = isOpen
    ? galleryImages[activeIndex]
    : null

  function open(index) {
    setActiveIndex(index)
    setZoom(1)
  }

  function close() {
    setActiveIndex(null)
    setZoom(1)
  }

  function previous() {
    if (galleryImages.length <= 1) return

    setActiveIndex((current) =>
      current === 0
        ? galleryImages.length - 1
        : current - 1
    )

    setZoom(1)
  }

  function next() {
    if (galleryImages.length <= 1) return

    setActiveIndex((current) =>
      current === galleryImages.length - 1
        ? 0
        : current + 1
    )

    setZoom(1)
  }

  function zoomIn() {
    setZoom((value) => Math.min(value + 0.25, 4))
  }

  function zoomOut() {
    setZoom((value) => Math.max(value - 0.25, 0.5))
  }

  function resetZoom() {
    setZoom(1)
  }

  /*
   * Keyboard controls.
   */
  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        close()
        return
      }

      if (event.key === 'ArrowLeft') {
        previous()
        return
      }

      if (event.key === 'ArrowRight') {
        next()
        return
      }

      if (event.key === '+' || event.key === '=') {
        zoomIn()
        return
      }

      if (event.key === '-') {
        zoomOut()
        return
      }

      if (event.key === '0') {
        resetZoom()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  if (!galleryImages.length) {
    return null
  }

  return (
    <>
      {/* Image/gallery */}
      <div style={{ margin: 0 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.max(
              1,
              columns
            )}, minmax(0, 1fr))`,
            gap: '12px'
          }}
        >
          {galleryImages.map((image, index) => (
            <ExampleImage
              key={
                image.src ||
                image.caption ||
                index
              }
              {...image}
              interactive
              flush={flush}
              onClick={() => open(index)}
            />
          ))}
        </div>

        {note && (
          <p
            style={{
              fontSize: '13px',
              color:
                'var(--nextra-gray-600, #71717a)',
              marginTop: '10px'
            }}
          >
            {note}
          </p>
        )}
      </div>

      {/* Lightbox */}
      {isOpen && activeImage?.src && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={
            activeImage.alt ||
            activeImage.caption ||
            'Image viewer'
          }
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              close()
            }
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0, 0, 0, 0.88)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            boxSizing: 'border-box'
          }}
        >
          {/* Top controls */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              right: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 2
            }}
          >
            <span
              style={{
                color: 'rgba(255,255,255,0.75)',
                fontSize: '13px'
              }}
            >
              {activeIndex + 1} / {galleryImages.length}
            </span>

            <button
              type="button"
              onClick={close}
              aria-label="Close image viewer"
              style={controlStyle}
            >
              ×
            </button>
          </div>

          {/* Image viewport */}
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'auto',
              padding: '60px 70px 110px',
              boxSizing: 'border-box'
            }}
          >
            <img
              src={activeImage.src}
              alt={activeImage.alt || ''}
              onWheel={(event) => {
                event.preventDefault()

                if (event.deltaY < 0) {
                  zoomIn()
                } else {
                  zoomOut()
                }
              }}
              style={{
                maxWidth:
                  zoom === 1 ? '100%' : 'none',
                maxHeight:
                  zoom === 1 ? '100%' : 'none',
                width:
                  zoom === 1
                    ? 'auto'
                    : `${zoom * 100}%`,
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '8px',
                transition:
                  'width 150ms ease',
                userSelect: 'none'
              }}
              draggable={false}
            />
          </div>

          {/* Previous */}
          {galleryImages.length > 1 && (
            <button
              type="button"
              onClick={previous}
              aria-label="Previous image"
              style={{
                ...sideButtonStyle,
                left: '16px'
              }}
            >
              ‹
            </button>
          )}

          {/* Next */}
          {galleryImages.length > 1 && (
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              style={{
                ...sideButtonStyle,
                right: '16px'
              }}
            >
              ›
            </button>
          )}

          {/* Bottom toolbar */}
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px',
              borderRadius: '12px',
              background: 'rgba(20,20,20,0.88)',
              border:
                '1px solid rgba(255,255,255,0.12)',
              boxShadow:
                '0 10px 30px rgba(0,0,0,0.3)'
            }}
          >
            <button
              type="button"
              onClick={zoomOut}
              aria-label="Zoom out"
              style={toolbarButtonStyle}
            >
              −
            </button>

            <button
              type="button"
              onClick={resetZoom}
              aria-label="Reset zoom"
              style={zoomLabelStyle}
            >
              {Math.round(zoom * 100)}%
            </button>

            <button
              type="button"
              onClick={zoomIn}
              aria-label="Zoom in"
              style={toolbarButtonStyle}
            >
              +
            </button>

            <span style={separatorStyle} />

            <a
              href={activeImage.src}
              target="_blank"
              rel="noreferrer"
              aria-label="Open original image in a new tab"
              style={toolbarButtonStyle}
            >
              ↗
            </a>

            <a
              href={activeImage.src}
              download
              aria-label="Download image"
              style={toolbarButtonStyle}
            >
              ↓
            </a>
          </div>

          {/* Caption */}
          {activeImage.caption && (
            <div
              style={{
                position: 'absolute',
                bottom: '76px',
                left: '24px',
                right: '24px',
                textAlign: 'center',
                color: 'rgba(255,255,255,0.82)',
                fontSize: '13px',
                pointerEvents: 'none'
              }}
            >
              {activeImage.caption}
            </div>
          )}
        </div>
      )}
    </>
  )
}

const controlStyle = {
  width: '40px',
  height: '40px',
  border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: '10px',
  background: 'rgba(20,20,20,0.75)',
  color: '#fff',
  fontSize: '26px',
  lineHeight: 1,
  cursor: 'pointer'
}

const sideButtonStyle = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '44px',
  height: '64px',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '12px',
  background: 'rgba(20,20,20,0.75)',
  color: '#fff',
  fontSize: '40px',
  lineHeight: 1,
  cursor: 'pointer',
  zIndex: 3
}

const toolbarButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '36px',
  height: '34px',
  padding: '0 9px',
  border: 0,
  borderRadius: '7px',
  background: 'rgba(255,255,255,0.08)',
  color: '#fff',
  textDecoration: 'none',
  fontSize: '16px',
  cursor: 'pointer'
}

const zoomLabelStyle = {
  ...toolbarButtonStyle,
  minWidth: '54px',
  fontSize: '12px'
}

const separatorStyle = {
  width: '1px',
  height: '20px',
  background: 'rgba(255,255,255,0.15)',
  margin: '0 3px'
}