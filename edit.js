/**
 * Shape Section - Editor Component
 */

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	InnerBlocks,
	MediaUpload,
	MediaUploadCheck,
	useSetting,
} from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	SelectControl,
	FocalPointPicker,
} from '@wordpress/components';

const TEMPLATE = [
	[ 'core/heading', { placeholder: __( 'Add heading...', 'wp-theme-fse' ), level: 2 } ],
	[ 'core/group', { className: 'sub-content' }, [
		[ 'core/paragraph', { placeholder: __( 'Add content...', 'wp-theme-fse' ) } ],
		[ 'core/paragraph', { placeholder: __( 'Add more content...', 'wp-theme-fse' ) } ],
		[ 'core/buttons', {}, [
			[ 'core/button', { placeholder: __( 'Add button text...', 'wp-theme-fse' ) } ],
		] ],
	]]
];

// Convert focal point (0-1) to position percentage (-100% to 100%)
const focalPointToPosition = ( value ) => {
	return `${ ( ( value * 2 ) - 1 ) * 100 }%`;
};

const Edit = ( { attributes, setAttributes } ) => {
	const { backgroundImage, imagePosition, mobileBackgroundImage, mobileImagePosition, contentAlignment } = attributes;

	const blockProps = useBlockProps( {
		className: `shape-section shape-section--align-${ contentAlignment }`,
	} );

	const onSelectImage = ( media ) => {
		// Build srcset from available sizes
		const srcset = media.sizes
			? Object.values( media.sizes )
				.map( ( size ) => `${ size.url } ${ size.width }w` )
				.join( ', ' )
			: '';

		setAttributes( {
			backgroundImage: {
				id: media.id,
				url: media.url,
				alt: media.alt || '',
				srcset,
				sizes: '100vw',
				width: media.width,
				height: media.height,
			},
		} );
	};

	const onRemoveImage = () => {
		setAttributes( {
			backgroundImage: {
				id: null,
				url: '',
				alt: '',
				srcset: '',
				sizes: '',
				width: null,
				height: null,
			},
		} );
	};

	const onSelectMobileImage = ( media ) => {
		// Build srcset from available sizes
		const srcset = media.sizes
			? Object.values( media.sizes )
				.map( ( size ) => `${ size.url } ${ size.width }w` )
				.join( ', ' )
			: '';

		setAttributes( {
			mobileBackgroundImage: {
				id: media.id,
				url: media.url,
				alt: media.alt || '',
				srcset,
				sizes: '100vw',
				width: media.width,
				height: media.height,
			},
		} );
	};

	const onRemoveMobileImage = () => {
		setAttributes( {
			mobileBackgroundImage: {
				id: null,
				url: '',
				alt: '',
				srcset: '',
				sizes: '',
				width: null,
				height: null,
			},
		} );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Layout Settings', 'wp-theme-fse' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Content Alignment', 'wp-theme-fse' ) }
						value={ contentAlignment }
						options={ [
							{ label: __( 'Left', 'wp-theme-fse' ), value: 'left' },
							{ label: __( 'Right', 'wp-theme-fse' ), value: 'right' },
						] }
						onChange={ ( value ) => setAttributes( { contentAlignment: value } ) }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Background Image', 'wp-theme-fse' ) }
					initialOpen={ true }
				>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ onSelectImage }
							allowedTypes={ [ 'image' ] }
							value={ backgroundImage?.id }
							render={ ( { open } ) => (
								<div>
									{ backgroundImage?.url ? (
										<div>
											<img
												src={ backgroundImage.url }
												alt={ backgroundImage.alt || __( 'Background', 'wp-theme-fse' ) }
												style={ {
													maxWidth: '100%',
													height: 'auto',
													borderRadius: '4px',
													marginBottom: '12px',
												} }
											/>
											<div style={ { display: 'flex', gap: '8px', marginBottom: '16px' } }>
												<Button
													variant="secondary"
													onClick={ open }
												>
													{ __( 'Replace', 'wp-theme-fse' ) }
												</Button>
												<Button
													isDestructive
													onClick={ onRemoveImage }
												>
													{ __( 'Remove', 'wp-theme-fse' ) }
												</Button>
											</div>
											{ imagePosition ? (
												<>
													<FocalPointPicker
														label={ __( 'Image Position', 'wp-theme-fse' ) }
														url={ backgroundImage.url }
														value={ imagePosition }
														onChange={ ( value ) => setAttributes( { imagePosition: value } ) }
													/>
													<Button
														variant="tertiary"
														isDestructive
														onClick={ () => setAttributes( { imagePosition: null } ) }
														style={ { marginTop: '8px' } }
													>
														{ __( 'Clear Position', 'wp-theme-fse' ) }
													</Button>
												</>
											) : (
												<Button
													variant="secondary"
													onClick={ () => setAttributes( { imagePosition: { x: 0.5, y: 0.5 } } ) }
												>
													{ __( 'Set Custom Position', 'wp-theme-fse' ) }
												</Button>
											) }
										</div>
									) : (
										<Button
											variant="secondary"
											onClick={ open }
										>
											{ __( 'Select Background Image', 'wp-theme-fse' ) }
										</Button>
									) }
								</div>
							) }
						/>
					</MediaUploadCheck>
				</PanelBody>

				<PanelBody
					title={ __( 'Mobile Background Image', 'wp-theme-fse' ) }
					initialOpen={ false }
				>
					<p style={ { fontSize: '12px', color: '#757575', marginBottom: '12px' } }>
						{ __( 'Optional: Set a different background image for mobile devices.', 'wp-theme-fse' ) }
					</p>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ onSelectMobileImage }
							allowedTypes={ [ 'image' ] }
							value={ mobileBackgroundImage?.id }
							render={ ( { open } ) => (
								<div>
									{ mobileBackgroundImage?.url ? (
										<div>
											<img
												src={ mobileBackgroundImage.url }
												alt={ mobileBackgroundImage.alt || __( 'Mobile Background', 'wp-theme-fse' ) }
												style={ {
													maxWidth: '100%',
													height: 'auto',
													borderRadius: '4px',
													marginBottom: '12px',
												} }
											/>
											<div style={ { display: 'flex', gap: '8px', marginBottom: '16px' } }>
												<Button
													variant="secondary"
													onClick={ open }
												>
													{ __( 'Replace', 'wp-theme-fse' ) }
												</Button>
												<Button
													isDestructive
													onClick={ onRemoveMobileImage }
												>
													{ __( 'Remove', 'wp-theme-fse' ) }
												</Button>
											</div>
											{ mobileImagePosition ? (
												<>
													<FocalPointPicker
														label={ __( 'Mobile Image Position', 'wp-theme-fse' ) }
														url={ mobileBackgroundImage.url }
														value={ mobileImagePosition }
														onChange={ ( value ) => setAttributes( { mobileImagePosition: value } ) }
													/>
													<Button
														variant="tertiary"
														isDestructive
														onClick={ () => setAttributes( { mobileImagePosition: null } ) }
														style={ { marginTop: '8px' } }
													>
														{ __( 'Clear Position', 'wp-theme-fse' ) }
													</Button>
												</>
											) : (
												<Button
													variant="secondary"
													onClick={ () => setAttributes( { mobileImagePosition: { x: 0.5, y: 0.5 } } ) }
												>
													{ __( 'Set Custom Position', 'wp-theme-fse' ) }
												</Button>
											) }
										</div>
									) : (
										<Button
											variant="secondary"
											onClick={ open }
										>
											{ __( 'Select Mobile Image', 'wp-theme-fse' ) }
										</Button>
									) }
								</div>
							) }
						/>
					</MediaUploadCheck>
				</PanelBody>
			</InspectorControls>

			<section { ...blockProps }>
				{ backgroundImage?.url && (
					<div className="shape-section__image">
						<img
							src={ backgroundImage.url }
							alt={ backgroundImage.alt || '' }
							style={ imagePosition ? {
								'--image-left': focalPointToPosition( imagePosition.x ),
								'--image-top': focalPointToPosition( imagePosition.y ),
							} : undefined }
						/>
					</div>
				) }
				<div className="shape-section__content">
					<InnerBlocks
						template={ TEMPLATE }
						templateLock={ false }
					/>
				</div>
			</section>
		</>
	);
};

export default Edit;
