
const API = (() => {
  
  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxs5HRWN1s79IzGIT4TuwSotFkXXwreWoF_tRIpPL-pNTDJt-Ptw15C_89EdpFylTPL/exec';
 
  const DEMO_MODE = false;

  
  const DEMO = {
    users: [
      { id: 'U001', username: 'admin',  password: 'admin123',  role: 'admin',      technicianName: 'Admin User',   mobile: '9000000000' },
      { id: 'U002', username: 'rahul',  password: 'tech123',   role: 'technician', technicianName: 'Rahul Sharma', mobile: '9111111111' },
      { id: 'U003', username: 'priya',  password: 'tech123',   role: 'technician', technicianName: 'Priya Patel',  mobile: '9222222222' },
      { id: 'U004', username: 'karan',  password: 'tech123',   role: 'technician', technicianName: 'Karan Mehta',  mobile: '9333333333' },
    ],
    technicians: [
      { id: 'T001', name: 'Rahul Sharma', mobile: '9111111111', email: 'rahul@service.com', skills: 'AC, Refrigerator, Washing Machine', status: 'active',   assignedJobs: 5 },
      { id: 'T002', name: 'Priya Patel',  mobile: '9222222222', email: 'priya@service.com', skills: 'TV, Microwave, Mixer Grinder',       status: 'active',   assignedJobs: 3 },
      { id: 'T003', name: 'Karan Mehta',  mobile: '9333333333', email: 'karan@service.com', skills: 'Geyser, AC, Refrigerator',           status: 'inactive', assignedJobs: 0 },
    ],
    tasks: [
      { id: 'JB001', customerName: 'Amit Gupta',   customerMobile: '9401234567', location: 'Sector 14, Gurugram',      serviceDate: '2026-05-21', brand: 'Samsung',  appliance: 'AC',               problem: 'Not cooling properly',       technician: 'Rahul Sharma', technicianMobile: '9111111111', priority: 'High',   status: 'Pending',     remarks: '',                    image: '', createdAt: '2026-05-20T09:00:00', completedAt: '' },
      { id: 'JB002', customerName: 'Sunita Devi',  customerMobile: '9509876543', location: 'DLF Phase 2, Gurugram',   serviceDate: '2026-05-21', brand: 'LG',       appliance: 'Refrigerator',     problem: 'Water leakage from bottom',  technician: 'Priya Patel',  technicianMobile: '9222222222', priority: 'Medium', status: 'In Progress', remarks: '',                    image: '', createdAt: '2026-05-20T10:30:00', completedAt: '' },
      { id: 'JB003', customerName: 'Vikram Singh', customerMobile: '9311223344', location: 'Sohna Road, Faridabad',   serviceDate: '2026-05-19', brand: 'Whirlpool',appliance: 'Washing Machine',  problem: 'Drum not spinning',          technician: 'Rahul Sharma', technicianMobile: '9111111111', priority: 'Low',    status: 'Completed',   remarks: 'Motor belt replaced', image: '', createdAt: '2026-05-18T14:00:00', completedAt: '2026-05-19T16:00:00' },
      { id: 'JB004', customerName: 'Meena Kumari', customerMobile: '9876123456', location: 'Vasant Kunj, New Delhi',  serviceDate: '2026-05-22', brand: 'Panasonic',appliance: 'Microwave',        problem: 'Turntable not rotating',     technician: 'Priya Patel',  technicianMobile: '9222222222', priority: 'Medium', status: 'Pending',     remarks: '',                    image: '', createdAt: '2026-05-21T08:00:00', completedAt: '' },
      { id: 'JB005', customerName: 'Ravi Kumar',   customerMobile: '9701122334', location: 'MG Road, Gurugram',       serviceDate: '2026-05-20', brand: 'Daikin',   appliance: 'AC',               problem: 'Gas refill needed',          technician: 'Rahul Sharma', technicianMobile: '9111111111', priority: 'High',   status: 'Completed',   remarks: 'Gas refilled 1.5 kg', image: '', createdAt: '2026-05-19T11:00:00', completedAt: '2026-05-20T15:00:00' },
      { id: 'JB006', customerName: 'Anjali Verma', customerMobile: '9612233445', location: 'Sector 56, Gurugram',     serviceDate: '2026-05-23', brand: 'Voltas',   appliance: 'AC',               problem: 'Remote not working',         technician: 'Karan Mehta',  technicianMobile: '9333333333', priority: 'Low',    status: 'Pending',     remarks: '',                    image: '', createdAt: '2026-05-21T12:00:00', completedAt: '' },
    ],
    notifications: [
      { id: 'N1', text: 'New job JB006 assigned to Karan Mehta', time: '2 min ago', read: false },
      { id: 'N2', text: 'Job JB002 status changed to In Progress', time: '1 hr ago', read: false },
      { id: 'N3', text: 'Job JB005 completed by Rahul Sharma', time: '3 hr ago', read: true },
    ]
  };

  let _tasks = [...DEMO.tasks];
  let _techs  = [...DEMO.technicians];
  let _nextId = 7;


  async function request(action, payload = {}) {
    if (DEMO_MODE) return demoHandler(action, payload);
    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        // headers: { 'Content-Type': 'text' },
        body: JSON.stringify({ action, ...payload })
      });
      return await res.json();
    } catch (e) {
      console.error('API Error:', e);
      return { success: false, message: 'Network error. Please check connection.' };
    }
  }



  function demoHandler(action, payload) {
    return new Promise(resolve => {
      setTimeout(() => {
        switch (action) {
          case 'login': {
            const u = DEMO.users.find(x => x.username === payload.username && x.password === payload.password);
            if (u) resolve({ success: true, user: { id: u.id, username: u.username, role: u.role, name: u.technicianName, mobile: u.mobile } });
            else   resolve({ success: false, message: 'Invalid username or password' });
            break;
          }
          case 'getTasks':
            resolve({ success: true, data: [..._tasks] });
            break;
          case 'addTask': {
            const t = { ...payload.task, id: `JB00${_nextId++}`, createdAt: new Date().toISOString(), completedAt: '' };
            _tasks.push(t);
            resolve({ success: true, data: t });
            break;
          }
          case 'updateTask': {
            const i = _tasks.findIndex(x => x.id === payload.id);
            if (i >= 0) { _tasks[i] = { ..._tasks[i], ...payload.data }; resolve({ success: true, data: _tasks[i] }); }
            else resolve({ success: false, message: 'Task not found' });
            break;
          }
          case 'deleteTask': {
            _tasks = _tasks.filter(x => x.id !== payload.id);
            resolve({ success: true });
            break;
          }
          case 'completeTask': {
            const j = _tasks.findIndex(x => x.id === payload.id);
            if (j >= 0) {
              _tasks[j] = { ..._tasks[j], status: 'Completed', remarks: payload.remarks, completedAt: new Date().toISOString(), completionImage: payload.image || '' };
              resolve({ success: true, data: _tasks[j] });
            } else resolve({ success: false, message: 'Task not found' });
            break;
          }
          case 'getTechnicians':
            resolve({ success: true, data: [..._techs] });
            break;
          case 'addTechnician': {
            const nt = { ...payload.tech, id: `T00${_techs.length + 1}`, assignedJobs: 0 };
            _techs.push(nt);
            resolve({ success: true, data: nt });
            break;
          }
          case 'updateTechnician': {
            const ti = _techs.findIndex(x => x.id === payload.id);
            if (ti >= 0) { _techs[ti] = { ..._techs[ti], ...payload.data }; resolve({ success: true, data: _techs[ti] }); }
            else resolve({ success: false, message: 'Technician not found' });
            break;
          }
          case 'deleteTechnician': {
            _techs = _techs.filter(x => x.id !== payload.id);
            resolve({ success: true });
            break;
          }
          case 'getNotifications':
            resolve({ success: true, data: DEMO.notifications });
            break;
          default:
            resolve({ success: false, message: 'Unknown action' });
        }
      }, 300 + Math.random() * 400);
    });
  }

  return {
    login:              (username, password)    => request('login', { username, password }),
    getTasks:           ()                      => request('getTasks'),
    addTask:            (task)                  => request('addTask', { task }),
    updateTask:         (id, data)              => request('updateTask', { id, data }),
    deleteTask:         (id)                    => request('deleteTask', { id }),
    completeTask:       (id, remarks, image,amount, partsAmount)    => request('completeTask', { id, remarks, image, amount , partsAmount}),
    getTechnicians:     ()                      => request('getTechnicians'),
    addTechnician:      (tech)                  => request('addTechnician', { tech }),
    updateTechnician:   (id, data)              => request('updateTechnician', { id, data }),
    deleteTechnician:   (id)                    => request('deleteTechnician', { id }),
    getNotifications:   ()                      => request('getNotifications'),
    isDemoMode:         ()                      => DEMO_MODE,
  };
})();

  