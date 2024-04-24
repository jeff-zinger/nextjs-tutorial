'use client'
import React from 'react';

const Error = (error) => {
    return (
        <div>
            {error.error.message}
        </div>
    );
};

export default Error;