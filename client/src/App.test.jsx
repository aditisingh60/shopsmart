import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, it, expect, vi } from 'vitest';

describe('App', () => {
    it('renders ShopSmart title', () => {
        render(<App />);
        const brandLink = screen.getByRole('link', { name: /shop\s*smart/i });
        expect(brandLink).toBeInTheDocument();
    });
});
