import React, {useState} from 'react'
import NavbarMenu from './NavbarMenu'
import DropDownMenu from './DropDownMenu'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => {
    setIsOpen(!isOpen)
  }

    return (
        <div>
            <NavbarMenu isOpen={isOpen} toggle={toggle} />
            <DropDownMenu isOpen={isOpen} toggle={toggle} />
            <DropDownMenu />
        </div>
    )
}

export default Navbar
