import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Header from '../header'

jest.mock('@clerk/nextjs', () => ({
    ...jest.requireActual('@clerk/nextjs'),
    UserButton: () => <div>UserButton</div>,
  }));

it('sould render the same headline passes as props', () => {
    render(<Header title='Magic Event Site'/>)  // ARRANGE
    const headingElement= screen.getByText('Magic Event Site')//ACT 
    
    expect(headingElement).toBeInTheDocument() //ASSERT
    
})




