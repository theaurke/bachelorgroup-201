import React from 'react';
import { render } from '@testing-library/react';
import Step from '../Step.jsx';
import '@testing-library/jest-dom';


describe('Step Component Test', () => {

    test('renders step with provided props', () => {
        const props = {
            title: 'Step 1',
            description: 'Some text',
            split: 5,
            src: 'url'
        };

        const { getByTestId } = render(<Step {...props} />);

        const stepImg = getByTestId('stepImg');
        const stepTitle = getByTestId('stepTitle');
        const stepDesc = getByTestId('stepDesc');

        expect(stepImg).toBeInTheDocument();
        expect(stepTitle).toBeInTheDocument();
        expect(stepDesc).toBeInTheDocument();

        expect(stepImg).toHaveAttribute('src', props.src);
        expect(stepImg).toHaveAttribute('alt', props.title);
        expect(stepTitle).toHaveTextContent(props.title);
        expect(stepDesc).toHaveTextContent(props.description.slice(0, props.split));
        expect(stepDesc).toHaveTextContent(props.description.slice(props.split));

    });

});