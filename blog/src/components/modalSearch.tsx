import React, { useState } from "react"
import Modal from "react-modal"
import Search from "./search"
import styled from "styled-components"
import { Link } from "gatsby"

Modal.setAppElement("#___gatsby")
const ModalSearch: React.FC = () => {
  let subtitle: HTMLHeadingElement | null
  const [modalIsOpen, setIsOpen] = useState<boolean>(false)

  function openModal() {
    setIsOpen(true)
  }

  function afterOpenModal() {
    if (subtitle) subtitle.style.color = "#f00"
  }

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <>
      <Link to={""} onClick={openModal}>
        Search
      </Link>
      <Modal
        // className={"Modal"}
        className="modalSearchWindow"
        // contentLabel="Modal"
        contentLabel="SearchModal"
        isOpen={modalIsOpen}
        // style={customStyles}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        overlayClassName="modalSearchOverlay"
      >
        <HeaderWrapper>
          <h2 ref={_subtitle => (subtitle = _subtitle)}>Search</h2>
          <button onClick={closeModal}>close</button>
        </HeaderWrapper>
        <Search />
      </Modal>
    </>
  )
}
export default ModalSearch

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;

  h2 {
    color: var(--colorPrimary) !important;
  }
`
