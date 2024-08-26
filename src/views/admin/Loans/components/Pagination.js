// components/Pagination.js
import React from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ButtonGroup spacing={4}>
      {pages.map(page => (
        <Button
          key={page}
          colorScheme={page === currentPage ? 'blue' : 'gray'}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default Pagination;
