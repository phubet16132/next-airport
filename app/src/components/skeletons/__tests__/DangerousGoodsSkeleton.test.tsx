import { render } from '@testing-library/react'
import DangerousGoodsSkeleton from '../DangerousGoodsSkeleton'

describe('DangerousGoodsSkeleton', () => {
    it('renders correctly with pulse animation', () => {
        const { container } = render(<DangerousGoodsSkeleton />)
        const skeletonWrapper = container.firstChild as HTMLElement
        expect(skeletonWrapper).toHaveClass('animate-pulse')
    })
})
