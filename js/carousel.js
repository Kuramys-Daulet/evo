Let XPos = 0;  
 Gsap.Timeline()  
   .Set('.Ring', { RotationY:180, Cursor:'Grab' }) //Set Initial RotationY So The Parallax Jump Happens Off Screen  
   .Set('.Img', { // Apply Transform Rotations To Each Image  
    RotateY: (I)=> I*-36,  
    TransformOrigin: '50% 50% 500px',  
    Z: -500,  
    BackgroundImage:(I)=>'Url(Https://Picsum.Photos/Id/'+(I+32)+'/600/400/)',  
    BackgroundPosition:(I)=>GetBgPos(I),  
    BackfaceVisibility:'Hidden'  
   })    
   .From('.Img', {  
    Duration:1.5,  
    Y:200,  
    Opacity:0,  
    Stagger:0.1,  
    Ease:'Expo'  
   })  
   .Add(()=>{  
    $('.Img').On('Mouseenter', (E)=>{  
     Let Current = E.CurrentTarget;  
     Gsap.To('.Img', {Opacity:(I,T)=>(T==Current)? 1:0.5, Ease:'Power3'})  
    })  
    $('.Img').On('Mouseleave', (E)=>{  
     Gsap.To('.Img', {Opacity:1, Ease:'Power2.InOut'})  
    })  
   }, '-=0.5')  
 $(Window).On('Mousedown Touchstart', DragStart);  
 $(Window).On('Mouseup Touchend', DragEnd);  
 Function DragStart(E){   
  If (E.Touches) E.ClientX = E.Touches[0].ClientX;  
  XPos = Math.Round(E.ClientX);  
  Gsap.Set('.Ring', {Cursor:'Grabbing'})  
  $(Window).On('Mousemove Touchmove', Drag);  
 }  
 Function Drag(E){  
  If (E.Touches) E.ClientX = E.Touches[0].ClientX;    
  Gsap.To('.Ring', {  
   RotationY: '-=' +( (Math.Round(E.ClientX)-XPos)%360 ),  
   OnUpdate:()=>{ Gsap.Set('.Img', { BackgroundPosition:(I)=>GetBgPos(I) }) }  
  });  
  XPos = Math.Round(E.ClientX);  
 }  
 Function DragEnd(E){  
  $(Window).Off('Mousemove Touchmove', Drag);  
  Gsap.Set('.Ring', {Cursor:'Grab'});  
 }  
 Function GetBgPos(I){ //Returns The Background-Position String To Create Parallax Movement In Each Image  
  Return ( 100-Gsap.Utils.Wrap(0,360,Gsap.GetProperty('.Ring', 'RotationY')-180-I*36)/360*500 )+'Px 0px';  
 }  