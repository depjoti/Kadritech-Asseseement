// src/components/Column.js
import React from 'react';
import { Paper, Typography, Button } from '@mui/material';
import TodoItem from './TodoItem';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../ItemTypes';

const Column = ({ title, status, items, onMoveItem, onAddItem, onUpdateItem }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.TODO,
    drop: (item) => onMoveItem(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [status]);

  let titleColor = '';
  switch (status) {
    case 'new':
      titleColor = '#2196f3'; // Blue for New
      break;
    case 'ongoing':
      titleColor = '#ff9800'; // Orange for Ongoing
      break;
    case 'done':
      titleColor = '#4caf50'; // Green for Done
      break;
    default:
      titleColor = 'inherit';
  }

  return (
    <Paper
      ref={drop}
      style={{
        padding: '10px',
        minHeight: '300px',
        minWidth: '250px',
        backgroundColor: isOver ? '#f0f0f0' : 'transparent',
      }}
    >
      <Typography variant="h6" gutterBottom style={{ background: titleColor, textAlign: 'center' }}>
        {title}
      </Typography>
      <div style={{ marginTop: '10px' }}>
        {items.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            description={todo.description}
            status={todo.status}
            onUpdateItem={(id, newTitle, newDescription, targetStatus) => {
              // Move the item to the targetStatus
              onMoveItem(id, targetStatus);
              // Update the item with new title and description
              onUpdateItem(id, newTitle, newDescription);
            }}
          />
        ))}
      </div>
      {status === 'new' && (
        <Button variant="contained" onClick={onAddItem}>
          Create New Todo
        </Button>
      )}
    </Paper>
  );
};

export default Column;


// // src/components/Column.js
// import React from 'react';
// import { Paper, Typography, Menu, MenuItem, ListItemIcon, Button } from '@mui/material';
// import { MoreVert } from '@mui/icons-material';
// import TodoItem from './TodoItem';
// import { useDrop } from 'react-dnd';
// import { ItemTypes } from '../ItemTypes'; // Ensure ItemTypes.TODO is defined properly

// const Column = ({ title, status, items, onMoveItem, onAddItem, onUpdateItem }) => {
//   const [menuAnchor, setMenuAnchor] = React.useState(null);

//   const handleMenuOpen = (event) => {
//     setMenuAnchor(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setMenuAnchor(null);
//   };

//   const handleMoveItemClick = (itemId, targetStatus) => {
//     onMoveItem(itemId, targetStatus);
//     handleMenuClose();
//   };

//   const [{ isOver }, drop] = useDrop(() => ({
//     accept: ItemTypes.TODO,
//     drop: (item) => onMoveItem(item.id, status),
//     collect: (monitor) => ({
//       isOver: !!monitor.isOver(),
//     }),
//   }), [status]);

//   let titleColor = '';
//   switch (status) {
//     case 'new':
//       titleColor = '#2196f3'; // Blue for New
//       break;
//     case 'ongoing':
//       titleColor = '#ff9800'; // Orange for Ongoing
//       break;
//     case 'done':
//       titleColor = '#4caf50'; // Green for Done
//       break;
//     default:
//       titleColor = 'inherit';
//   }

//   return (
//     <Paper
//       ref={drop}
//       style={{
//         padding: '10px',
//         minHeight: '300px',
//         minWidth: '250px',
//         backgroundColor: isOver ? '#f0f0f0' : 'transparent',
//       }}
//     >
//       <Typography variant="h6" gutterBottom style={{ background: titleColor, textAlign: 'center' }}>
//         {title}
//       </Typography>
//       <div style={{ marginTop: '10px' }}>
//         {items.map((todo) => (
//           <TodoItem
//             key={todo.id}
//             id={todo.id}
//             title={todo.title}
//             description={todo.description}
//             status={todo.status}
//             onOpenMenu={handleMenuOpen}
//             onUpdateItem={onUpdateItem}
//           />
//         ))}
//       </div>
//       {status === 'new' && (
//         <Button variant="contained" onClick={onAddItem}>
//           Create New Todo
//         </Button>
//       )}
//       <Menu
//         anchorEl={menuAnchor}
//         open={Boolean(menuAnchor)}
//         onClose={handleMenuClose}
//       >
//         {status === 'new' && (
//           <>
//             <MenuItem onClick={() => handleMoveItemClick(null, 'ongoing')}>
//               <ListItemIcon>
//                 <MoreVert fontSize="small" />
//               </ListItemIcon>
//               Move to Ongoing
//             </MenuItem>
//             <MenuItem onClick={() => handleMoveItemClick(null, 'done')}>
//               <ListItemIcon>
//                 <MoreVert fontSize="small" />
//               </ListItemIcon>
//               Move to Done
//             </MenuItem>
//           </>
//         )}
//         {status === 'ongoing' && (
//           <>
//             <MenuItem onClick={() => handleMoveItemClick(null, 'new')}>
//               <ListItemIcon>
//                 <MoreVert fontSize="small" />
//               </ListItemIcon>
//               Move to New
//             </MenuItem>
//             <MenuItem onClick={() => handleMoveItemClick(null, 'done')}>
//               <ListItemIcon>
//                 <MoreVert fontSize="small" />
//               </ListItemIcon>
//               Move to Done
//             </MenuItem>
//           </>
//         )}
//         {status === 'done' && (
//           <>
//             <MenuItem onClick={() => handleMoveItemClick(null, 'new')}>
//               <ListItemIcon>
//                 <MoreVert fontSize="small" />
//               </ListItemIcon>
//               Move to New
//             </MenuItem>
//             <MenuItem onClick={() => handleMoveItemClick(null, 'ongoing')}>
//               <ListItemIcon>
//                 <MoreVert fontSize="small" />
//               </ListItemIcon>
//               Move to Ongoing
//             </MenuItem>
//           </>
//         )}
//       </Menu>
//     </Paper>
//   );
// };

// export default Column;


