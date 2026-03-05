import { render, screen } from '@testing-library/react'
import BoardingPassCard from '../BoardingPassCard'

describe('BoardingPassCard', () => {
    const mockPass = {
        name: 'JOHN DOE',
        pnr: 'QWZ123',
        seat: '12A',
        seq: '001',
    }

    it('renders passenger name', () => {
        render(<BoardingPassCard pass={mockPass} />)
        expect(screen.getByText('JOHN DOE')).toBeInTheDocument()
    })

    it('renders passenger PNR', () => {
        render(<BoardingPassCard pass={mockPass} />)
        expect(screen.getByText(/QWZ123/)).toBeInTheDocument()
    })

    it('renders seat number', () => {
        render(<BoardingPassCard pass={mockPass} />)
        expect(screen.getByText('12A')).toBeInTheDocument()
    })

    it('renders sequence number', () => {
        render(<BoardingPassCard pass={mockPass} />)
        expect(screen.getByText('001')).toBeInTheDocument()
    })
})
