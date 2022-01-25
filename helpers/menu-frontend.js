

const getMenuFrontEnd = (role = 'USER_ROLE') => {
  const menu = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        {title: 'Main', url: '/'},
        {title: 'Graficas', url: 'grafica1'},
        {title: 'ProgressBar', url: 'progress'},
        {title: 'Promesas', url: 'promise'},
        {title: 'Rxjs', url: 'rxjs'},
      ]
    },
    {
      title: 'Mantenimiento',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        // {title: 'Usuarios', url: 'users'},
        {title: 'Hospitales', url: 'hospitals'},
        {title: 'Medicos', url: 'medics'},

      ]
    }
  ];

  if(role === 'ADMIN_ROLE'){
      menu[1].submenu.unshift({title: 'Usuarios', url: 'users'})
  }

  return menu;
}

module.exports = {
    getMenuFrontEnd
}