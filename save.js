/**
 * Shape Section - Save Component
 */

import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

// Convert focal point (0-1) to position percentage (-100% to 100%)
const focalPointToPosition = ( value ) => {
	return `${ ( ( value * 2 ) - 1 ) * 100 }%`;
};

const Save = ( { attributes } ) => {
	const { backgroundImage, imagePosition, mobileBackgroundImage, mobileImagePosition, contentAlignment } = attributes;
	const hasMobileImage = mobileBackgroundImage?.url;


	const blockProps = useBlockProps.save( {
		className: `shape-section shape-section--align-${ contentAlignment }`,
	} );

	return (
		<section { ...blockProps }>
			{ backgroundImage?.url && (
				<div className={ `shape-section__image${ hasMobileImage ? ' shape-section__image--desktop' : '' }` }>
					<img
						src={ backgroundImage.url }
						srcSet={ backgroundImage.srcset || undefined }
						sizes={ backgroundImage.sizes || undefined }
						width={ backgroundImage.width || undefined }
						height={ backgroundImage.height || undefined }
						alt={ backgroundImage.alt || '' }
						loading="lazy"
						style={ imagePosition ? {
							'--image-left': focalPointToPosition( imagePosition.x ),
							'--image-top': focalPointToPosition( imagePosition.y ),
						} : undefined }
					/>
				</div>
			) }
			{ hasMobileImage && (
				<div className="shape-section__image shape-section__image--mobile">
					<img
						src={ mobileBackgroundImage.url }
						srcSet={ mobileBackgroundImage.srcset || undefined }
						sizes={ mobileBackgroundImage.sizes || undefined }
						width={ mobileBackgroundImage.width || undefined }
						height={ mobileBackgroundImage.height || undefined }
						alt={ mobileBackgroundImage.alt || '' }
						loading="lazy"
						style={ mobileImagePosition ? {
							'--mobile-image-left': focalPointToPosition( mobileImagePosition.x ),
							'--mobile-image-top': focalPointToPosition( mobileImagePosition.y ),
						} : undefined }
					/>
				</div>
			) }
			<div className="shape-section__content" >
				<div className="inner">
					<InnerBlocks.Content />
				</div>
			</div>
		</section>
	);
};

export default Save;
