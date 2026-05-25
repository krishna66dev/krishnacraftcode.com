function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const action = data.action;

  let result;
  switch(action) {
    case 'login':
      result = handleLogin(ss, data);
      break;
    case 'getTasks':
      result = getTasks(ss);
      break;
    case 'addTask':
      result = addTask(ss, data.task);
      break;
    case 'updateTask':
      result = updateTask(ss, data.id, data.data);
      break;
    case 'deleteTask':
      result = deleteTask(ss, data.id);
      break;
    case 'completeTask':
      result = completeTask(ss, data.id, data.remarks, data.image);
      break;
    case 'getTechnicians':
      result = getTechnicians(ss);
      break;
    case 'addTechnician':
      result = addTechnician(ss, data.tech);
      break;
    case 'updateTechnician':
      result = updateTechnician(ss, data.id, data.data);
      break;
    case 'deleteTechnician':
      result = deleteTechnician(ss, data.id);
      break;
    default:
      result = { success: false, message: 'Unknown action' };
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}


function handleLogin(ss, data) {
  const sheet = ss.getSheetByName('Users');
  const rows  = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][1] === data.username && rows[i][2] === data.password) {
      return { success: true, user: {
        id: rows[i][0], username: rows[i][1],
        role: rows[i][3], name: rows[i][4], mobile: rows[i][5]
      }};
    }
  }
  return { success: false, message: 'Invalid credentials' };
}


function getTasks(ss) {
  const sheet = ss.getSheetByName('Tasks');
  const rows  = sheet.getDataRange().getValues();
  const tasks = [];
  for (let i = 1; i < rows.length; i++) {
    if (!rows[i][0]) continue; 
    tasks.push({
      id:              String(rows[i][0]  || ''),
      customerName:    String(rows[i][1]  || ''),
      customerMobile:  String(rows[i][2]  || ''),
      location:        String(rows[i][3]  || ''),
      serviceDate:     String(rows[i][4]  || ''),
      brand:           String(rows[i][5]  || ''),
      appliance:       String(rows[i][6]  || ''),
      problem:         String(rows[i][7]  || ''),
      technician:      String(rows[i][8]  || ''),
      technicianMobile:String(rows[i][9]  || ''),
      priority:        String(rows[i][10] || 'Medium'),
      status:          String(rows[i][11] || 'Pending'),
      remarks:         String(rows[i][12] || ''),
      image:           String(rows[i][13] || ''),
      createdAt:       String(rows[i][14] || ''),
      completedAt:     String(rows[i][15] || '')
    });
  }
  return { success: true, data: tasks };
}

function addTask(ss, task) {
  const sheet   = ss.getSheetByName('Tasks');
  const lastRow = sheet.getLastRow();
  const newId   = 'JB' + String(lastRow).padStart(3, '0');
  const now     = new Date().toISOString();

  sheet.appendRow([
    newId,
    task.customerName     || '',
    task.customerMobile   || '',
    task.location         || '',
    task.serviceDate      || '',
    task.brand            || '',
    task.appliance        || '',
    task.problem          || '',
    task.technician       || '',
    task.technicianMobile || '',
    task.priority         || 'Medium',
    task.status           || 'Pending',
    task.remarks          || '',
    task.image            || '',
    now,
    ''
  ]);

  return { success: true, data: { ...task, id: newId, createdAt: now, completedAt: '' } };
}

function updateTask(ss, id, data) {
  const sheet    = ss.getSheetByName('Tasks');
  const rowIndex = findRowById(sheet, id, 0); 
  if (rowIndex === -1) return { success: false, message: 'Task not found: ' + id };

  const range   = sheet.getRange(rowIndex, 1, 1, 16);
  const current = range.getValues()[0];

  if (data.customerName)      current[1]  = data.customerName;
  if (data.customerMobile)    current[2]  = data.customerMobile;
  if (data.location)          current[3]  = data.location;
  if (data.serviceDate)       current[4]  = data.serviceDate;
  if (data.brand)             current[5]  = data.brand;
  if (data.appliance)         current[6]  = data.appliance;
  if (data.problem)           current[7]  = data.problem;
  if (data.technician)        current[8]  = data.technician;
  if (data.technicianMobile)  current[9]  = data.technicianMobile;
  if (data.priority)          current[10] = data.priority;
  if (data.status)            current[11] = data.status;
  if (data.remarks !== undefined) current[12] = data.remarks;
  if (data.image)             current[13] = data.image;

  range.setValues([current]);
  return { success: true, data: { ...rowToTask(current) } };
}

function deleteTask(ss, id) {
  const sheet    = ss.getSheetByName('Tasks');
  const rowIndex = findRowById(sheet, id, 0);
  if (rowIndex === -1) return { success: false, message: 'Task not found: ' + id };
  sheet.deleteRow(rowIndex);
  return { success: true };
}

function completeTask(ss, id, remarks, image) {
  const sheet    = ss.getSheetByName('Tasks');
  const rowIndex = findRowById(sheet, id, 0);
  if (rowIndex === -1) return { success: false, message: 'Task not found: ' + id };

  const range   = sheet.getRange(rowIndex, 1, 1, 16);
  const current = range.getValues()[0];

  current[11] = 'Completed';
  current[12] = remarks || '';
  current[15] = new Date().toISOString();
  if (image) current[13] = image;

  range.setValues([current]);
  return { success: true, data: rowToTask(current) };
}


function getTechnicians(ss) {
  const sheet = ss.getSheetByName('Users');
  const rows  = sheet.getDataRange().getValues();
  const technicians = [];

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][3] !== 'technician') continue; 
    if (!rows[i][0]) continue;
    technicians.push({
      id:     String(rows[i][0]),  
      name:   String(rows[i][4]),  
      mobile: String(rows[i][5])   
    });
  }

  return { success: true, data: technicians };
}

function addTechnician(ss, tech) {
  const sheet   = ss.getSheetByName('Users');
  const lastRow = sheet.getLastRow();
  const newId   = 'T' + String(lastRow).padStart(3, '0');
  const username = (tech.name || 'tech').toLowerCase().replace(/\s+/g, '') + lastRow;
  let randomNum = Math.floor(1000 + Math.random() * 9000);  
  const Password = (tech.name || 'tech').toLowerCase().replace(/\s+/g, '') + '@' + randomNum;

  const status = tech.status || 'active';
  const skills = tech.skills ? tech.skills.join(',') : '';
  const email = tech.email || '';

  sheet.appendRow([
    newId,       
    username,    
    Password,   
    'technician',
    tech.name   || '',  
    tech.mobile || '',
    status,
    skills,
    email   
  ]);

  return { success: true, data: { id: newId, name: tech.name, mobile: tech.mobile } };
}

function updateTechnician(ss, id, data) {
  const sheet = ss.getSheetByName('Users');

  const allRows = sheet.getDataRange().getValues();
  let rowIndex = -1;
  for (let i = 1; i < allRows.length; i++) {
    if (allRows[i][3] !== 'technician') continue;  
    if (String(allRows[i][0]) === String(id)) { rowIndex = i + 1; break; } 
  }

  if (rowIndex === -1) return { success: false, message: 'Technician not found: ' + id };

  const range   = sheet.getRange(rowIndex, 1, 1, 6);
  const current = range.getValues()[0];

  if (data.name)   current[4] = data.name;   
  if (data.mobile) current[5] = data.mobile;  

  range.setValues([current]);

  return { success: true, data: { id: String(current[0]), name: String(current[4]), mobile: String(current[5]) } };
}

function deleteTechnician(ss, id) {
  const sheet   = ss.getSheetByName('Users');
  const allRows = sheet.getDataRange().getValues();

  for (let i = 1; i < allRows.length; i++) {
    if (allRows[i][3] !== 'technician') continue; 
    if (String(allRows[i][0]) === String(id)) {
      sheet.deleteRow(i + 1); 
      return { success: true };
    }
  }

  return { success: false, message: 'Technician not found: ' + id };
}

function findRowById(sheet, id, colIndex) {
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][colIndex]).trim() === String(id).trim()) {
      return i + 1; 
    }
  }
  return -1;
}

function rowToTask(r) {
  return {
    id:              String(r[0]  || ''),
    customerName:    String(r[1]  || ''),
    customerMobile:  String(r[2]  || ''),
    location:        String(r[3]  || ''),
    serviceDate:     String(r[4]  || ''),
    brand:           String(r[5]  || ''),
    appliance:       String(r[6]  || ''),
    problem:         String(r[7]  || ''),
    technician:      String(r[8]  || ''),
    technicianMobile:String(r[9]  || ''),
    priority:        String(r[10] || 'Medium'),
    status:          String(r[11] || 'Pending'),
    remarks:         String(r[12] || ''),
    image:           String(r[13] || ''),
    createdAt:       String(r[14] || ''),
    completedAt:     String(r[15] || '')
  };
}