'use client'

import Image from 'next/image'

/**
 * Displays a documentation example image.
 *
 * When src is provided, the actual image is rendered.
 * When interactive is true, clicking the image invokes onClick.
 *
 * If src is not provided, a consistent placeholder is rendered.
 *
 * @param {Object} props
 * @param {string} [props.src] - Image source URL.
 * @param {string} [props.alt] - Accessible alternative text.
 * @param {string} [props.caption] - Optional caption.
 * @param {number} [props.width=1536] - Intrinsic image width.
 * @param {number} [props.height=1024] - Intrinsic image height.
 * @param {string} [props.ratio='16 / 10'] - Placeholder aspect ratio.
 * @param {() => void} [props.onClick] - Click handler.
 * @param {boolean} [props.interactive=false] - Makes the image clickable.
 *
 * @returns {JSX.Element}
 */
export function ExampleImage({
  src,
  alt,
  caption,
  width = 1536,
  height = 1024,
  ratio = '16 / 10',
  onClick,
  interactive = false,
  flush = false
}) {
  if (src) {
    return (
      <figure style={{ margin: '1.25rem 0' }}>
        <button
          type="button"
          onClick={onClick}
          disabled={!interactive}
          aria-label={
            interactive
              ? `View ${
                  alt ||
                  caption ||
                  'image'
                } fullscreen`
              : undefined
          }
          style={{
            display: 'block',
            width: '100%',
            padding: 0,
            border: 0,
            background: 'transparent',
            cursor: interactive
              ? 'zoom-in'
              : 'default',
            textAlign: 'left'
          }}
        >
          <Image
            src={src}
            alt={alt || ''}
            width={width}
            height={height}
            sizes="(max-width: 768px) 100vw, 100%"
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
              borderRadius: '10px',
              border: flush
                ? 0
                : '1px solid var(--land-border-strong, #e5e0fa)'
            }}
          />
        </button>

        {caption && (
          <figcaption
            style={{
              fontSize: '13px',
              color:
                'var(--nextra-gray-600, #71717a)',
              marginTop: '8px'
            }}
          >
            {caption}
          </figcaption>
        )}
      </figure>
    )
  }

  return (
    <div
      style={{
        margin: '1.25rem 0',
        aspectRatio: ratio,
        borderRadius: '10px',
        border:
          '1px dashed var(--land-border-strong, #d4d4d8)',
        background:
          'var(--land-surface-soft, rgba(0,0,0,0.02))',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        textAlign: 'center',
        padding: '1.5rem'
      }}
    >
      <span
        style={{
          fontSize: '13px',
          fontWeight: 600,
          color:
            'var(--nextra-gray-600, #71717a)'
        }}
      >
        Screenshot pending
      </span>

      {caption && (
        <span
          style={{
            fontSize: '12.5px',
            color:
              'var(--nextra-gray-500, #a1a1aa)',
            maxWidth: '380px'
          }}
        >
          {caption}
        </span>
      )}
    </div>
  )
}