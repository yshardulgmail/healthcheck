import * as React from 'react';

import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/chakra-ui';
import { Box, Stack, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import styles from './index.css'
// import { nodes } from './data';

const key = 'Search';
const nodes = [
    {
      id: '0',
      name: 'Shopping List',
      deadline: new Date(2020, 1, 15),
      type: 'TASK',
      isComplete: true,
      nodes: 3,
    },
  ];
  
  const COLUMNS = [
    { label: 'Task', renderCell: (item) => <a href="https://www.google.com">{item.name}</a> },
    {
      label: 'Deadline',
      renderCell: (item) =>
        item.deadline.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
    },
    { label: 'Type', renderCell: (item) => item.type },
    {
      label: 'Complete',
      renderCell: (item) => item.isComplete.toString(),
    },
    { label: 'Tasks', renderCell: (item) => item.nodes },
  ];

const Component = () => {
  let data = { nodes };

  const chakraTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(chakraTheme);

  const [search, setSearch] = React.useState('');

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  data = {
    nodes: data.nodes.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())),
  };

//   const COLUMNS = [
//     { label: 'Task', renderCell: (item) => item.name },
//     {
//       label: 'Deadline',
//       renderCell: (item) =>
//         item.deadline.toLocaleDateString('en-US', {
//           year: 'numeric',
//           month: '2-digit',
//           day: '2-digit',
//         }),
//     },
//     { label: 'Type', renderCell: (item) => item.type },
//     {
//       label: 'Complete',
//       renderCell: (item) => item.isComplete.toString(),
//     },
//     { label: 'Tasks', renderCell: (item) => item.nodes?.length },
//   ];

  return (
    <div>
      <Stack spacing={10}>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<FaSearch style={{ color: '#4a5568' }} />}
          />
          <Input class={styles.search_input} placeholder="Search Task" value={search} onChange={handleSearch} />
        </InputGroup>
      </Stack>
      <br />

      <Box p={3} borderWidth="1px" borderRadius="lg">
        <CompactTable columns={COLUMNS} data={data} theme={theme} />
      </Box>

      <br />
    </div>
  );
};

export default Component;