import { render, screen } from '@testing-library/react'
import Card from './Card'

describe('Card component', () => {
    it('Проверяем, рендерится ли компонент', () => {
        render(<Card />);
    });

    it('Есть ли в компоненте текст цена и грн', () => {
        render(<Card />);

        expect(screen.getByText('Цена:')).toBeInTheDocument();
        expect(screen.getByText(/ грн./)).toBeInTheDocument();

    });

    it('Есть тег img', () => {
        render(<Card />);

        expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('Не должно быть тега h1', () => {
        render(<Card />);

        expect(screen.queryByRole('list')).toBeNull();
    });

    it('Card snapshot', () => {
        const view = render(<Card price={2112} />);

        expect(view).toMatchSnapshot();
    });

    it('Card snapshot2', () => {
        const utils = render(<Card price={2122112} />);

        expect(utils).toMatchSnapshot();
    });
})