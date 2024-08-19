
import { render, screen, fireEvent } from '@testing-library/react';
import Fetcher from '../Fetcher';


//Passed
test('renders Fetcher component', () => {
    render(<Fetcher />);
    expect(screen.getByTestId('fetcher-comp'));
});


//Passed
test('adds a new URL field when clicking "Add Field" btn', () => {
    render(<Fetcher />);
    const addButton = screen.getByRole('button', { name: /\+ Add Field/i });
    fireEvent.click(addButton);
    expect(screen.getAllByRole('textbox')).toHaveLength(4);
});


//Passed
test('displays error message when form is submitted with all empty fields', async () => {
    render(<Fetcher />);
    const submitButton = screen.getByTestId('submit-btn');
    fireEvent.click(submitButton);

    expect(await screen.findByText((content, element) =>
        content.includes('At least one URL required')
    ))
});


//Passed
test('fetches metadata and updates state', async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve([{ title: 'Sample Title', description: 'Sample Description', image: 'Sample Image' }]),
        })
    );

    render(<Fetcher />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'http://example.com' } });
    fireEvent.click(screen.getByText(/Fetch!/i));

    expect(await screen.findByText(/Sample Title/i));
});


//Passed
test('displays error message when fetch fails', async () => {
    global.fetch = jest.fn(() =>
        Promise.reject(new Error('Network error'))
    );

    render(<Fetcher />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'http://example.com' } });
    fireEvent.click(screen.getByText(/Fetch!/i));

    expect(await screen.findByText((content, element) =>
        content.includes('Error fetching metadata')
    ));
});
