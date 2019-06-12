import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'

import InfoPagePreview from './preview-templates/InfoPagePreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'
import SectionPagePreview from './preview-templates/SectionPagePreview'

CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('info', InfoPagePreview)
CMS.registerPreviewTemplate('section', SectionPagePreview)
