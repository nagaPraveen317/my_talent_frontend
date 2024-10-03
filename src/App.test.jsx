import App from './App'
import UserManagementPage from './pages/UserManagementPage';
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userData from '../tests/users.js';
import fetchMock from 'fetch-mock';

beforeEach(() => {
  fetchMock.mock('/users', { data: userData }); 
});

afterEach(() => fetchMock.restore()); 


describe('Test Components', () => {

  it('renders the UserManagementPage component', () => {    
    render(<UserManagementPage />)
    screen.debug();
    expect(screen.getByText('Manage Users')).toBeInTheDocument
  })

})