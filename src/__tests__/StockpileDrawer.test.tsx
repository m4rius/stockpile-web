// src/__tests__/StockpileDrawer.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Dialog } from '@/components/ui/dialog';
import StockpileDrawer from '../components/StockpileDrawer'
import { StockpileItem } from '../api/stockpile'

describe('StockpileDrawer', () => {
    it('renders with given stockpile item', () => {
        const testItem: StockpileItem = {
            id: 1,
            name: 'Vannflaske',
            requiredQuantity: 10,
            shops: ['Rema 1000', 'Biltema'],
        }

        render(
            <Dialog open>
            <StockpileDrawer
                open={true}
                setOpen={() => {}}
                selectedItem={testItem}
                setItems={() => {}}
            />
            </Dialog>
        )

        // Sjekker at navnet vises i input-feltet
        expect(screen.getByDisplayValue('Vannflaske')).toBeInTheDocument()
        expect(screen.getByDisplayValue('10')).toBeInTheDocument()

        // Eventuelt: sjekk at dialogen finnes
        expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
})