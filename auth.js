const _0x211383=_0x3667;function _0x34b3(){const _0x3cdf8f=['finals-calculator-21','username','fa-eye','Login\x20successful!','7VUDoxp','info','text','2139968BGeXMH','email','adminCode','G-9CYRQR52LP','471560wNxQxT','1:234377632584:web:bf92d92752829426f0717d','getAttribute','notification','fa-eye-slash','serverTimestamp','remove','type','value','GEODEVELOPMENT21','dashboard.html','error','onAuthStateChanged','1616913HewGHp','includes','doc','resetForm','.toggle-password','href','login.html','toggle','success','8zlsAhx','FieldValue','234377632584','finals-calculator-21.firebaseapp.com','473489NSAhTS','password','signup.html','sendPasswordResetEmail','AIzaSyACe57ULrtFWBkTMZaExGTuCJb8GKhawPw','18AMTuhD','2638985cOEBzI','submit','.notification-close','Invalid\x20admin\x20code','set','signupForm','createUserWithEmailAndPassword','6406870Gamiik','preventDefault','firestore','className','message','location','querySelector','users','pathname','getElementById','uid','4995318hBgOrT','Account\x20created\x20successfully!','length','addEventListener','.notification-message','initializeApp','collection','classList','apps','click','input'];_0x34b3=function(){return _0x3cdf8f;};return _0x34b3();}(function(_0x1c0e39,_0x485400){const _0x4e9a77=_0x3667,_0x266977=_0x1c0e39();while(!![]){try{const _0x57c2b5=-parseInt(_0x4e9a77(0x13e))/0x1+parseInt(_0x4e9a77(0x120))/0x2+parseInt(_0x4e9a77(0x131))/0x3*(-parseInt(_0x4e9a77(0x13a))/0x4)+parseInt(_0x4e9a77(0x144))/0x5+-parseInt(_0x4e9a77(0x156))/0x6+parseInt(_0x4e9a77(0x11d))/0x7*(parseInt(_0x4e9a77(0x124))/0x8)+parseInt(_0x4e9a77(0x143))/0x9*(parseInt(_0x4e9a77(0x14b))/0xa);if(_0x57c2b5===_0x485400)break;else _0x266977['push'](_0x266977['shift']());}catch(_0x324c0c){_0x266977['push'](_0x266977['shift']());}}}(_0x34b3,0x87484));const firebaseConfig={'apiKey':_0x211383(0x142),'authDomain':_0x211383(0x13d),'projectId':_0x211383(0x119),'storageBucket':'finals-calculator-21.firebasestorage.app','messagingSenderId':_0x211383(0x13c),'appId':_0x211383(0x125),'measurementId':_0x211383(0x123)};!firebase[_0x211383(0x116)][_0x211383(0x158)]&&firebase[_0x211383(0x113)](firebaseConfig);function _0x3667(_0x392419,_0x400d5e){const _0x34b3da=_0x34b3();return _0x3667=function(_0x366717,_0x54455f){_0x366717=_0x366717-0x111;let _0x26316a=_0x34b3da[_0x366717];return _0x26316a;},_0x3667(_0x392419,_0x400d5e);}const auth=firebase['auth']();function showNotification(_0x370002,_0x5005a5=_0x211383(0x11e)){const _0x2f2a58=_0x211383,_0x18e781=document['getElementById'](_0x2f2a58(0x127)),_0xade6c0=_0x18e781['querySelector'](_0x2f2a58(0x112));_0xade6c0['textContent']=_0x370002,_0x18e781[_0x2f2a58(0x14e)]='notification\x20show\x20'+_0x5005a5,setTimeout(()=>{const _0x25b210=_0x2f2a58;_0x18e781['classList'][_0x25b210(0x12a)]('show');},0xbb8);}document[_0x211383(0x151)](_0x211383(0x146))?.['addEventListener'](_0x211383(0x117),()=>{const _0x3dc37e=_0x211383;document[_0x3dc37e(0x154)](_0x3dc37e(0x127))[_0x3dc37e(0x115)][_0x3dc37e(0x12a)]('show');}),document[_0x211383(0x151)](_0x211383(0x135))?.[_0x211383(0x111)](_0x211383(0x117),function(){const _0x4c946a=_0x211383,_0x4b151c=this['parentElement']['querySelector'](_0x4c946a(0x118)),_0x2373f4=_0x4b151c[_0x4c946a(0x126)]('type')===_0x4c946a(0x13f)?_0x4c946a(0x11f):_0x4c946a(0x13f);_0x4b151c['setAttribute'](_0x4c946a(0x12b),_0x2373f4),this[_0x4c946a(0x115)][_0x4c946a(0x138)](_0x4c946a(0x11b)),this[_0x4c946a(0x115)][_0x4c946a(0x138)](_0x4c946a(0x128));});const loginForm=document[_0x211383(0x154)]('loginForm');loginForm&&loginForm[_0x211383(0x111)](_0x211383(0x145),async _0xf6691=>{const _0x587699=_0x211383;_0xf6691[_0x587699(0x14c)]();const _0x27ff1e=document[_0x587699(0x154)]('email')[_0x587699(0x12c)],_0x358abc=document[_0x587699(0x154)](_0x587699(0x13f))['value'];try{await auth['signInWithEmailAndPassword'](_0x27ff1e,_0x358abc),showNotification(_0x587699(0x11c),'success'),setTimeout(()=>{const _0x1948fb=_0x587699;window[_0x1948fb(0x150)][_0x1948fb(0x136)]=_0x1948fb(0x12e);},0x3e8);}catch(_0x51ed28){showNotification(_0x51ed28['message'],'error');}});const signupForm=document[_0x211383(0x154)](_0x211383(0x149));signupForm&&signupForm['addEventListener']('submit',async _0xbb232e=>{const _0x801e21=_0x211383;_0xbb232e[_0x801e21(0x14c)]();const _0x2c79d7=document[_0x801e21(0x154)]('email')['value'],_0x15781c=document[_0x801e21(0x154)]('password')[_0x801e21(0x12c)],_0x5e76da=document[_0x801e21(0x154)](_0x801e21(0x11a))[_0x801e21(0x12c)],_0x3ed70b=document[_0x801e21(0x154)](_0x801e21(0x122))[_0x801e21(0x12c)];if(_0x3ed70b!==_0x801e21(0x12d)){showNotification(_0x801e21(0x147),_0x801e21(0x12f));return;}try{const _0x3f724f=await auth[_0x801e21(0x14a)](_0x2c79d7,_0x15781c);await firebase[_0x801e21(0x14d)]()[_0x801e21(0x114)](_0x801e21(0x152))[_0x801e21(0x133)](_0x3f724f['user'][_0x801e21(0x155)])[_0x801e21(0x148)]({'username':_0x5e76da,'email':_0x2c79d7,'createdAt':firebase[_0x801e21(0x14d)][_0x801e21(0x13b)][_0x801e21(0x129)]()}),showNotification(_0x801e21(0x157),_0x801e21(0x139)),setTimeout(()=>{const _0x188393=_0x801e21;window[_0x188393(0x150)][_0x188393(0x136)]=_0x188393(0x12e);},0x3e8);}catch(_0x344e47){showNotification(_0x344e47[_0x801e21(0x14f)],_0x801e21(0x12f));}});const resetForm=document[_0x211383(0x154)](_0x211383(0x134));resetForm&&resetForm[_0x211383(0x111)](_0x211383(0x145),async _0x99c2f4=>{const _0x29eaaa=_0x211383;_0x99c2f4[_0x29eaaa(0x14c)]();const _0x46a196=document[_0x29eaaa(0x154)](_0x29eaaa(0x121))[_0x29eaaa(0x12c)];try{await auth[_0x29eaaa(0x141)](_0x46a196),showNotification('Password\x20reset\x20email\x20sent!','success'),setTimeout(()=>{const _0x7d942d=_0x29eaaa;window[_0x7d942d(0x150)][_0x7d942d(0x136)]=_0x7d942d(0x137);},0x7d0);}catch(_0x11867c){showNotification(_0x11867c[_0x29eaaa(0x14f)],_0x29eaaa(0x12f));}});auth[_0x211383(0x130)](_0x3ce24d=>{const _0x59974a=_0x211383,_0x4e0b38=window['location'][_0x59974a(0x153)];_0x3ce24d?(_0x4e0b38[_0x59974a(0x132)]('login.html')||_0x4e0b38[_0x59974a(0x132)](_0x59974a(0x140))||_0x4e0b38[_0x59974a(0x132)]('forgot-password.html'))&&(window[_0x59974a(0x150)]['href']=_0x59974a(0x12e)):_0x4e0b38[_0x59974a(0x132)](_0x59974a(0x12e))&&(window['location'][_0x59974a(0x136)]='login.html');});