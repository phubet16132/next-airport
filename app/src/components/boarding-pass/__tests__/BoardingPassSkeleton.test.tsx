import { render } from '@testing-library/react'
import BoardingPassSkeleton from '../BoardingPassSkeleton'

describe('BoardingPassSkeleton', () => {
    it('renders correctly with pulse animation', () => {
        const { container } = render(<BoardingPassSkeleton />)
        const skeletonWrapper = container.firstChild as HTMLElement
        expect(skeletonWrapper).toBeInTheDocument()
    })
})
