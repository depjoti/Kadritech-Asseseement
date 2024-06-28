// src/App.js
import React, { useState } from 'react';
import { Grid,Box } from '@mui/material';
import Column from './components/Column';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css'

const App = () => {
  const [todoItems, setTodoItems] = useState([]);

  const handleAddItem = () => {
    const newTodo = {
      id: todoItems.length + 1,
      title: `New Todo ${todoItems.length + 1}`,
      description: 'Edit this description.',
      status: 'new',
    };
    setTodoItems([...todoItems, newTodo]);
  };

  const handleMoveItem = (itemId, targetStatus) => {
    setTodoItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, status: targetStatus } : item
      )
    );
  };

  const handleUpdateItem = (itemId, newTitle, newDescription) => {
    setTodoItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, title: newTitle, description: newDescription }
          : item
      )
    );
  };

  const newItems = todoItems.filter((item) => item.status === 'new');
  const ongoingItems = todoItems.filter((item) => item.status === 'ongoing');
  const doneItems = todoItems.filter((item) => item.status === 'done');

  return (
    <Box sx={{width:'100%'}}>
       <DndProvider backend={HTML5Backend}>
      <Grid
        container
        spacing={3}
        p={10}
        direction="row"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }} // Ensuring the columns take full height
      >
        <Grid item>
          <Column
            title="New"
            status="new"
            items={newItems}
            onAddItem={handleAddItem}
            onMoveItem={handleMoveItem}
            onUpdateItem={handleUpdateItem}
          />
        </Grid>
        <Grid item>
          <Column
            title="Ongoing"
            status="ongoing"
            items={ongoingItems}
            onAddItem={handleAddItem}
            onMoveItem={handleMoveItem}
            onUpdateItem={handleUpdateItem}
          />
        </Grid>
        <Grid item>
          <Column
            title="Done"
            status="done"
            items={doneItems}
            onAddItem={handleAddItem}
            onMoveItem={handleMoveItem}
            onUpdateItem={handleUpdateItem}
          />
        </Grid>
      </Grid>
    </DndProvider>
    </Box>
   
  );
};

export default App;


// // src/App.js
// import React, { useState } from 'react';
// import { Grid } from '@mui/material';
// import Column from './components/Column';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';

// const App = () => {
//   const [todoItems, setTodoItems] = useState([]);

//   const handleAddItem = () => {
//     const newTodo = {
//       id: todoItems.length + 1,
//       title: `New Todo ${todoItems.length + 1}`,
//       description: 'Edit this description.',
//       status: 'new',
//     };
//     setTodoItems([...todoItems, newTodo]);
//   };

//   const handleMoveItem = (itemId, targetStatus) => {
//     setTodoItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === itemId ? { ...item, status: targetStatus } : item
//       )
//     );
//   };

//   const handleUpdateItem = (itemId, newTitle, newDescription) => {
//     setTodoItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === itemId
//           ? { ...item, title: newTitle, description: newDescription }
//           : item
//       )
//     );
//   };

//   const newItems = todoItems.filter((item) => item.status === 'new');
//   const ongoingItems = todoItems.filter((item) => item.status === 'ongoing');
//   const doneItems = todoItems.filter((item) => item.status === 'done');

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <Grid container spacing={3} justifyContent="center">
//         <Grid item>
//           <Column
//             title="New"
//             status="new"
//             items={newItems}
//             onAddItem={handleAddItem}
//             onMoveItem={handleMoveItem}
//             onUpdateItem={handleUpdateItem}
//           />
//         </Grid>
//         <Grid item>
//           <Column
//             title="Ongoing"
//             status="ongoing"
//             items={ongoingItems}
//             onAddItem={handleAddItem}
//             onMoveItem={handleMoveItem}
//             onUpdateItem={handleUpdateItem}
//           />
//         </Grid>
//         <Grid item>
//           <Column
//             title="Done"
//             status="done"
//             items={doneItems}
//             onAddItem={handleAddItem}
//             onMoveItem={handleMoveItem}
//             onUpdateItem={handleUpdateItem}
//           />
//         </Grid>
//       </Grid>
//     </DndProvider>
//   );
// };

// export default App;


// // src/App.js
// import React, { useState } from 'react';
// import { Grid } from '@mui/material';
// import Column from './components/Column';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';

// const App = () => {
//   const [todoItems, setTodoItems] = useState([]);

//   const handleAddItem = () => {
//     const newTodo = {
//       id: todoItems.length + 1,
//       title: `New Todo ${todoItems.length + 1}`,
//       description: 'Description of the new todo item.',
//       status: 'new',
//     };
//     setTodoItems([...todoItems, newTodo]);
//   };

//   const handleMoveItem = (itemId, targetStatus) => {
//     setTodoItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === itemId ? { ...item, status: targetStatus } : item
//       )
//     );
//   };

//   const newItems = todoItems.filter((item) => item.status === 'new');
//   const ongoingItems = todoItems.filter((item) => item.status === 'ongoing');
//   const doneItems = todoItems.filter((item) => item.status === 'done');

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <Grid container spacing={3} justifyContent="center">
//         <Grid item>
//           <Column
//             title="New"
//             status="new"
//             items={newItems}
//             onAddItem={handleAddItem}
//             onMoveItem={handleMoveItem}
//           />
//         </Grid>
//         <Grid item>
//           <Column
//             title="Ongoing"
//             status="ongoing"
//             items={ongoingItems}
//             onAddItem={handleAddItem}
//             onMoveItem={handleMoveItem}
//           />
//         </Grid>
//         <Grid item>
//           <Column
//             title="Done"
//             status="done"
//             items={doneItems}
//             onAddItem={handleAddItem}
//             onMoveItem={handleMoveItem}
//           />
//         </Grid>
//       </Grid>
//     </DndProvider>
//   );
// };

// export default App;
