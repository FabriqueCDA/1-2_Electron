// Tester la plateforme mac
const isMac = process.platform === 'darwin';

module.exports.menu = (win, dir)=>{
  return [
        {
            label: 'Etudiants',
            submenu: [{
                label:"Retour à l'accueil",
                toolTip:'Accéder à la liste des étudiants',
                accelerator: 'CmdOrCtrl+Shift+E',
                click: async() => {
                        let f =`file://${dir}/app/index.html`;
                        win.loadURL(f);
                        console.log(f);
                }
            },{
                label: 'Editer',
                accelerator: 'CmdOrCtrl+Shift+R',
                click: async() => {
                    let f = `file://${dir}/app/etudiants-edite.html`;
                    await win.loadURL(f);
                    console.log(f);
                }
            },
        ]
        },
        {
            label: 'Contacts',
            toolTip:'Contacter les étudiants',
            submenu: [{
                label: 'Nous contacter',
                accelerator: 'CmdOrCtrl+Shift+M',
                click: async() => {
                    // let f = `file://${__dirname}/app/pages/emails.html`;
                    let f = `file://${dir}/app/email.html`;
                    await win.loadURL(f);
                    console.log(f);
                }
            },{
                label: 'Réseaux sociaux',
                accelerator: 'CmdOrCtrl+Shift+R',
                click: async() => {
                    let f = `file://${dir}/app/reseaux.html`;
                    await win.loadURL(f);
                    console.log(f);
                }
            },
        ]
        },
        {
            label: 'Gérer',
            submenu: [
                {
                    label: "Actualiser",
                    accelerator: "F5",
                    click: (item, focusedWindow) => {
                      if (focusedWindow) {
                        // on reload, start fresh and close any old
                        // open secondary windows
                        if (focusedWindow.id === 1) {
                          BrowserWindow.getAllWindows().forEach(win => {
                            if (win.id > 1) win.close();
                          });
                        }
                        focusedWindow.reload();
                      }
                    }
                  },
                  {
                    label: "Outils de développement",
                    accelerator: "F12",
                    click: () => {
                      win.webContents.toggleDevTools();
                    }
                  },
                  isMac ? { role: 'close' } : { role: 'quit' }
            ]
        }
    ]};