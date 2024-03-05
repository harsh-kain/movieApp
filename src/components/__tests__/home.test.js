
import { render, screen } from "@testing-library/react";
import Test from '../Test'
import '@testing-library/jest-dom'
import React from "react";

test("render contact section", ()=>{

    render(<Test />)

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
})