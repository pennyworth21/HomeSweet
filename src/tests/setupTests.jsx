import "@testing-library/jest-dom/extend-expect"; // for additional matchers
import { server } from "./mocks/server"; // if using MSW for API mocking

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that are declared as a part of tests (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
