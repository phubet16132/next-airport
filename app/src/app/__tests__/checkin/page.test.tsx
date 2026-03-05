import { render, screen, fireEvent } from '@testing-library/react'
import CheckinPage from '@/app/checkin/page'

describe('CheckinPage', () => {
    it('renders checkin form and travel tips', () => {
        render(<CheckinPage />)

        // Header texts
        expect(screen.getByText('Online Check-in')).toBeInTheDocument()
        expect(screen.getByText('Retrieve Your Booking')).toBeInTheDocument()

        // Inputs
        expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Booking reference/i)).toBeInTheDocument()

        // Button
        expect(screen.getByRole('button', { name: /Retrieve Booking/i })).toBeInTheDocument()
    })

    it('disables submit button when form is incomplete, enables it when complete', () => {
        render(<CheckinPage />)

        const button = screen.getByRole('button', { name: /Retrieve Booking/i })
        const lastNameInput = screen.getByLabelText(/Last Name/i)
        const pnrInput = screen.getByLabelText(/Booking reference/i)

        // Initially disabled
        expect(button).toBeDisabled()

        // Partial input (only last name), still disabled
        fireEvent.change(lastNameInput, { target: { value: 'Smith' } })
        expect(button).toBeDisabled()

        // Both inputs filled, should be enabled
        fireEvent.change(pnrInput, { target: { value: 'ABC1234' } })
        expect(button).not.toBeDisabled()

        // Clear one, back to disabled
        fireEvent.change(lastNameInput, { target: { value: '' } })
        expect(button).toBeDisabled()
    })
})
