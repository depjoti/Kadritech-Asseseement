// src/components/TodoItem.js
import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../ItemTypes';
import { Paper, Typography, Menu, MenuItem, ListItemIcon, TextField, IconButton } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

const TodoItem = ({ id, title, description, status, onUpdateItem }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TODO,
    item: { id, title, status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [id, title, status]);

  const handleBlurTitle = () => {
    onUpdateItem(id, newTitle, newDescription, status);
    setIsEditingTitle(false);
  };

  const handleBlurDescription = () => {
    onUpdateItem(id, newTitle, newDescription, status);
    setIsEditingDescription(false);
  };

  const handleMenuOpen = (event) => {
    event.preventDefault();
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleMoveItemClick = (targetStatus) => {
    onUpdateItem(id, newTitle, newDescription, targetStatus);
    handleMenuClose();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return '#2196f3'; // Blue color for New
      case 'ongoing':
        return '#ff9800'; // Orange color for Ongoing
      case 'done':
        return '#4caf50'; // Green color for Done
      default:
        return '#757575'; // Default color
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <Paper
        ref={drag}
        style={{
          padding: '10px',
          marginBottom: '10px',
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move',
          borderLeft: `6px solid ${getStatusColor(status)}`, // Set border color based on status
        }}
        onContextMenu={handleMenuOpen}
      >
        {isEditingTitle ? (
          <TextField
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleBlurTitle}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleBlurTitle();
              }
            }}
            fullWidth
            autoFocus
            className="text-field-editing"
          />
        ) : (
          <Typography
            variant="subtitle1"
            onClick={() => setIsEditingTitle(true)}
            style={{ cursor: 'pointer' }}
            className="typography-subtitle"
          >
            {title}
          </Typography>
        )}
        {isEditingDescription ? (
          <TextField
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            onBlur={handleBlurDescription}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleBlurDescription();
              }
            }}
            fullWidth
            autoFocus
            className="text-field-editing"
          />
        ) : (
          <Typography
            variant="body2"
            onClick={() => setIsEditingDescription(true)}
            style={{ cursor: 'pointer' }}
            className="typography-body"
          >
            {description}
          </Typography>
        )}
        <Typography
          variant="caption"
          style={{
            color: getStatusColor(status), // Set text color based on status
            marginTop: '10px',
          }}
        >
          Status: {status}
        </Typography>
      </Paper>
      <IconButton
        aria-label="more"
        aria-controls={`menu-${id}`}
        aria-haspopup="true"
        onClick={handleMenuOpen}
        style={{ position: 'absolute', top: '10px', right: '10px' }}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id={`menu-${id}`}
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        {status !== 'new' && (
          <MenuItem onClick={() => handleMoveItemClick('new')}>
            <ListItemIcon>
              <MoreVert fontSize="small" />
            </ListItemIcon>
            Move to New
          </MenuItem>
        )}
        {status !== 'ongoing' && (
          <MenuItem onClick={() => handleMoveItemClick('ongoing')}>
            <ListItemIcon>
              <MoreVert fontSize="small" />
            </ListItemIcon>
            Move to Ongoing
          </MenuItem>
        )}
        {status !== 'done' && (
          <MenuItem onClick={() => handleMoveItemClick('done')}>
            <ListItemIcon>
              <MoreVert fontSize="small" />
            </ListItemIcon>
            Move to Done
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default TodoItem;

// // src/components/TodoItem.js
// import React, { useState } from 'react';
// import { useDrag } from 'react-dnd';
// import { ItemTypes } from '../ItemTypes';
// import { Paper, Typography, Menu, MenuItem, ListItemIcon, TextField, IconButton } from '@mui/material';
// import { MoreVert } from '@mui/icons-material';

// const TodoItem = ({ id, title, description, status, onOpenMenu, onUpdateItem }) => {
//   const [isEditingTitle, setIsEditingTitle] = useState(false);
//   const [isEditingDescription, setIsEditingDescription] = useState(false);
//   const [newTitle, setNewTitle] = useState(title);
//   const [newDescription, setNewDescription] = useState(description);
//   const [menuAnchor, setMenuAnchor] = useState(null);

//   const [{ isDragging }, drag] = useDrag(() => ({
//     type: ItemTypes.TODO,
//     item: { id, title, status },
//     collect: (monitor) => ({
//       isDragging: !!monitor.isDragging(),
//     }),
//   }), [id, title, status]);

//   const handleBlurTitle = () => {
//     onUpdateItem(id, newTitle, newDescription);
//     setIsEditingTitle(false);
//   };

//   const handleBlurDescription = () => {
//     onUpdateItem(id, newTitle, newDescription);
//     setIsEditingDescription(false);
//   };

//   const handleMenuOpen = (event) => {
//     event.preventDefault();
//     onOpenMenu(event);
//     setMenuAnchor(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setMenuAnchor(null);
//   };

//   const handleMoveItemClick = (targetStatus) => {
//     onUpdateItem(id, newTitle, newDescription, targetStatus);
//     handleMenuClose();
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'new':
//         return '#2196f3'; // Blue color for New
//       case 'ongoing':
//         return '#ff9800'; // Orange color for Ongoing
//       case 'done':
//         return '#4caf50'; // Green color for Done
//       default:
//         return '#757575'; // Default color
//     }
//   };

//   return (
//     <div style={{ position: 'relative' }}>
//       <Paper
//         ref={drag}
//         style={{
//           padding: '10px',
//           marginBottom: '10px',
//           opacity: isDragging ? 0.5 : 1,
//           cursor: 'move',
//           borderLeft: `6px solid ${getStatusColor(status)}`, // Set border color based on status
//         }}
//         onContextMenu={handleMenuOpen}
//       >
//         {isEditingTitle ? (
//           <TextField
//             value={newTitle}
//             onChange={(e) => setNewTitle(e.target.value)}
//             onBlur={handleBlurTitle}
//             onKeyPress={(e) => {
//               if (e.key === 'Enter') {
//                 handleBlurTitle();
//               }
//             }}
//             fullWidth
//             autoFocus
//             className="text-field-editing"
//           />
//         ) : (
//           <Typography
//             variant="subtitle1"
//             onClick={() => setIsEditingTitle(true)}
//             style={{ cursor: 'pointer' }}
//             className="typography-subtitle"
//           >
//             {title}
//           </Typography>
//         )}
//         {isEditingDescription ? (
//           <TextField
//             value={newDescription}
//             onChange={(e) => setNewDescription(e.target.value)}
//             onBlur={handleBlurDescription}
//             onKeyPress={(e) => {
//               if (e.key === 'Enter') {
//                 handleBlurDescription();
//               }
//             }}
//             fullWidth
//             autoFocus
//             className="text-field-editing"
//           />
//         ) : (
//           <Typography
//             variant="body2"
//             onClick={() => setIsEditingDescription(true)}
//             style={{ cursor: 'pointer' }}
//             className="typography-body"
//           >
//             {description}
//           </Typography>
//         )}
//         <Typography
//           variant="caption"
//           style={{
//             color: getStatusColor(status), // Set text color based on status
//             marginTop: '10px',
//           }}
//         >
//           Status: {status}
//         </Typography>
//       </Paper>
//       <IconButton
//         aria-label="more"
//         aria-controls={`menu-${id}`}
//         aria-haspopup="true"
//         onClick={handleMenuOpen}
//         style={{ position: 'absolute', top: '10px', right: '10px' }}
//       >
//         <MoreVert />
//       </IconButton>
//       <Menu
//         id={`menu-${id}`}
//         anchorEl={menuAnchor}
//         open={Boolean(menuAnchor)}
//         onClose={handleMenuClose}
//       >
//         {status === 'new' && (
//           <>
//             <MenuItem onClick={() => handleMoveItemClick('ongoing')}>
//               <ListItemIcon>
//                 <MoreVert fontSize="small" />
//               </ListItemIcon>
//               Move to Ongoing
//             </MenuItem>
//             <MenuItem onClick={() => handleMoveItemClick('done')}>
//               <ListItemIcon>
//                 <MoreVert fontSize="small" />
//               </ListItemIcon>
//               Move to Done
//             </MenuItem>
//           </>
//         )}
//         {status === 'ongoing' && (
//           <>
//             <MenuItem onClick={() => handleMoveItemClick('new')}>
//               <ListItemIcon>
//                 <MoreVert fontSize="small" />
//               </ListItemIcon>
//               Move to New
//             </MenuItem>
//             <MenuItem onClick={() => handleMoveItemClick('done')}>
//               <ListItemIcon>
//                 <MoreVert fontSize="small" />
//               </ListItemIcon>
//               Move to Done
//             </MenuItem>
//           </>
//         )}
//         {status === 'done' && (
//           <>
//             <MenuItem onClick={() => handleMoveItemClick('new')}>
//               <ListItemIcon>
//                 <MoreVert fontSize="small" />
//               </ListItemIcon>
//               Move to New
//             </MenuItem>
//             <MenuItem onClick={() => handleMoveItemClick('ongoing')}>
//               <ListItemIcon>
//                 <MoreVert fontSize="small" />
//               </ListItemIcon>
//               Move to Ongoing
//             </MenuItem>
//           </>
//         )}
//       </Menu>
//     </div>
//   );
// };

// export default TodoItem;


// import React, { useState } from 'react';
// import { useDrag } from 'react-dnd';
// import { ItemTypes } from '../ItemTypes';
// import { Paper, Typography, TextField } from '@mui/material';

// const TodoItem = ({ id, title, description, status, onOpenMenu, onUpdateItem }) => {
//   const [isEditingTitle, setIsEditingTitle] = useState(false);
//   const [isEditingDescription, setIsEditingDescription] = useState(false);
//   const [newTitle, setNewTitle] = useState(title);
//   const [newDescription, setNewDescription] = useState(description);

//   const [{ isDragging }, drag] = useDrag(() => ({
//     type: ItemTypes.TODO,
//     item: { id, title, status },
//     collect: (monitor) => ({
//       isDragging: !!monitor.isDragging(),
//     }),
//   }), [id, title, status]);

//   const handleBlurTitle = () => {
//     onUpdateItem(id, newTitle, newDescription);
//     setIsEditingTitle(false);
//   };

//   const handleBlurDescription = () => {
//     onUpdateItem(id, newTitle, newDescription);
//     setIsEditingDescription(false);
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'new':
//         return '#2196f3'; // Blue color for New
//       case 'ongoing':
//         return '#ff9800'; // Orange color for Ongoing
//       case 'done':
//         return '#4caf50'; // Green color for Done
//       default:
//         return '#757575'; // Default color
//     }
//   };

//   return (
//     <Paper
//       ref={drag}
//       style={{
//         padding: '10px',
//         marginBottom: '10px',
//         opacity: isDragging ? 0.5 : 1,
//         cursor: 'move',
//         borderLeft: `6px solid ${getStatusColor(status)}`, // Set border color based on status
//       }}
//       onContextMenu={(e) => {
//         e.preventDefault();
//         onOpenMenu(e);
//       }}
//     >
//       {isEditingTitle ? (
//         <TextField
//           value={newTitle}
//           onChange={(e) => setNewTitle(e.target.value)}
//           onBlur={handleBlurTitle}
//           onKeyPress={(e) => {
//             if (e.key === 'Enter') {
//               handleBlurTitle();
//             }
//           }}
//           fullWidth
//           autoFocus
//           className="text-field-editing"
//         />
//       ) : (
//         <Typography
//           variant="subtitle1"
//           onClick={() => setIsEditingTitle(true)}
//           style={{ cursor: 'pointer' }}
//           className="typography-subtitle"
//         >
//           {title}
//         </Typography>
//       )}
//       {isEditingDescription ? (
//         <TextField
//           value={newDescription}
//           onChange={(e) => setNewDescription(e.target.value)}
//           onBlur={handleBlurDescription}
//           onKeyPress={(e) => {
//             if (e.key === 'Enter') {
//               handleBlurDescription();
//             }
//           }}
          
//           fullWidth
//           autoFocus
//           className="text-field-editing"
//         />
//       ) : (
//         <Typography
//           variant="body2"
//           onClick={() => setIsEditingDescription(true)}
//           style={{ cursor: 'pointer' }}
//           className="typography-body"
//         >
//           {description}
//         </Typography>
//       )}
//       <Typography
//         variant="caption"
//         style={{
//           color: getStatusColor(status), // Set text color based on status
//           marginTop: '10px',
//         }}
//       >
//         Status: {status}
//       </Typography>
//     </Paper>
//   );
// };

// export default TodoItem;

