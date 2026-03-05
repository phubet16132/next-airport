import { render, screen } from '@testing-library/react'
import Header from '../Header'

describe('Header', () => {
    it('renders the Qoomlee logo', () => {
        render(<Header />)
        const logoElement = screen.getByText('Qoomlee')
        expect(logoElement).toBeInTheDocument()
    })

    it('renders the menu icon', () => {
        render(<Header />)
        // The menu icon is inside a div, so we can test the text
        const buttonElement = screen.getByText('P')
        expect(buttonElement).toBeInTheDocument()
    })
})
