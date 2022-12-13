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
      appName: "Google",
      appUrl: "https://www.google.com",
      upTime: "30",
      downTime: "10"
    },
    {
        id: '1',
        appName: "Facebook",
        appUrl: "https://www.facebook.com",
        upTime: "70",
        downTime: "20"
    },
    {
        id: '2',
        appName: "Microsoft",
        appUrl: "https://www.microsoft.com",
        upTime: "90",
        downTime: "30"
    },
  ];
  
  const COLUMNS = [
    { label: 'Application Name', renderCell: (item) => <a href={item.appUrl}>{item.appName}</a> },
    { label: 'Up Time', renderCell: (item) => item.upTime },
    { label: 'Down Time', renderCell: (item) => item.downTime },
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
    nodes: data.nodes.filter((item) => item.appName.toLowerCase().includes(search.toLowerCase())),
  };

//   const COLUMNS = [
//     { label: 'Application Name', renderCell: (item) => <a href={item.appUrl}>{item.appName}</a> },
//     { label: 'Up Time', renderCell: (item) => item.upTime },
//     { label: 'Down Time', renderCell: (item) => item.downTime },
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