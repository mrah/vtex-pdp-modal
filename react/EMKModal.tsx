import React, { useState, useEffect, useCallback } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useProduct } from 'vtex.product-context'
import { Modal } from 'vtex.styleguide'

interface ModalProps {
  imgUrl: string
  pid: string
  cid: string
  showOnce: boolean
}

const CSS_HANDLES = ['pdpModal']

const EMKModal: StorefrontFunctionComponent<ModalProps> = ({ imgUrl, pid, cid, showOnce }) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const handleClose = useCallback(() => setModalOpen(false), [])
  const productCtx = useProduct();
  const handles = useCssHandles(CSS_HANDLES)

  const { productId, categoryId } = productCtx.product;
  const uniqueId = 'Modal_' + productId || categoryId;

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem(uniqueId) || "");

    if ((pid === productId || cid === categoryId) && !showOnce) {
      setModalOpen(true);
    }

    if (storage && !storage?.shown && showOnce) {
      if (pid === productId || cid === categoryId) {
        localStorage.setItem(uniqueId, JSON.stringify({ shown: true }));
        setModalOpen(true);
      }
    }

  }, [])




  return (
    <>
      <Modal isOpen={isModalOpen}
        centered={true}
        onClose={handleClose} >
        <div className={`${handles.pdpModal}`}>
          {imgUrl && <img src={imgUrl} alt="Image" />}
        </div>
      </Modal>
    </>
  )
}



EMKModal.schema = {
  title: 'editor.pdp-modal.title',
  description: 'editor.pdp-modal.description',
  type: 'object',
  properties: {
    imgUrl: {
      title: 'Image URL',
      description: 'Image url to show in pop-up.',
      type: 'string',
      default: null,
    },
    pid: {
      title: 'Product ID',
      description: 'Products in which the Modal will be displayed.',
      type: 'string',
      default: null,
    },
    cid: {
      title: 'Category ID',
      description: 'Categories in which the Modal will be displayed.',
      type: 'string',
      default: null,
    },
    showOnce: {
      title: 'Show once',
      type: 'boolean',
      default: false
    }
  },
}

export default EMKModal
