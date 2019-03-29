$(document).ready(function() {
  console.log = function() {};
  console.warn = function() {};
  console.error = function() {};
  // LIBRARIES CODE
  LibVars = {};
  // PROJECT CODE
  var _that = this;
  _that.singlechoice_chosen = null;
  _that.singlechoice_form = null;
  /**
   * Returns the selected choice.
   */
  function getRadioButtonsValue() {
    return _that.singlechoice_chosen;
  }
  /**
   * This function will show or hide the input from screen layout.
   */
  function show() {
    return new Promise(function(resolve, reject) {
      // Block#: dq8@(Uf|R]WXAG8t!$J,
      if(!($('[obj-name="RadioButtonsInput"]').is(':visible'))) {
        // Block#: @#T]KSB}1ilGi6vn}e}S
        $('[obj-name="RadioButtons"]').show();
      }
    });
  }
  /**
   * This function will show or hide the input from screen layout.
   */
  function hide() {
    return new Promise(function(resolve, reject) {
      // Block#: ){`OBoW}_`?@Lc?$3o}Y
      if($('[obj-name="RadioButtonsInput"]').is(':visible')) {
        // Block#: eZl%)A*6SR@[,5)%I%#q
        $('[obj-name="RadioButtons"]').hide();
      }
    });
  }
  /**
   * Generates the choice list for radio buttons using field from api response.
   */
  function setRadioButtons(field) {
    return new Promise(function(resolve, reject) {
      // Block#: G:5v5K((+6C1^^D#/3ul
      if(field != null) {
        // Block#: z4r{x-mg/uwNvy;f3Of(
        if(com.fc.JavaScriptDistLib.TextLib.textComparison(com.fc.JavaScriptDistLib.Dictionary.getDictValue(field, 'type'), "EQUAL", 'radio-buttons')) {
          // Block#: p~spO)y=pN+#n!Omq7[j
          _that.singlechoice_form = field;
          // Block#: VK-,dGCII-*;fuEP]z@3
          if((com.fc.JavaScriptDistLib.Dictionary.conatinedInDict(field, 'value')) && (com.fc.JavaScriptDistLib.Dictionary.getDictValue(field, 'value')) != null) {
            // Block#: =h%9*,QnPO|=D;b[jenN
            _that.singlechoice_chosen = (com.fc.JavaScriptDistLib.Dictionary.getDictValue(field, 'value'));
          }
          // Block#: LY%*1/0]Wp@pf~j$G@a|
          hideError().then(response => {;
          });
          // Block#: cDOYpi.Z5Lo*@[{cX}13
          com.fc.JavaScriptDistLib.ListView.saveTemplateCell('RadioButtons');
          com.fc.JavaScriptDistLib.ListView.removeAllCells('RadioButtons');
          on_listview_length_configured_RadioButtons();
          // Block#: h3VcUUX2,h`pR7cS)te!
          $('[obj-name="RadioButtons"]').show();
        }
      }
    });
  }
  /**
   * Describe this function...
   */
  function hasRadioButtonsValue() {
    // Block#: *H_iL#,[YVeRl)N/6|vI
    var index_end = (com.fc.JavaScriptDistLib.Dictionary.getDictValue(_that.singlechoice_form, 'options')).length;
    var index_inc = 1;
    if(0 > index_end) {
      index_inc = -index_inc;
    }
    for(index = 0; index_inc >= 0 ? index <= index_end : index >= index_end; index += index_inc) {
      // Block#: 6F6=lV9*R84H|tGz?0Xe
      if(isSelected(index)) {
        return true;
      }
    }
    return false;
  }
  /**
   * Describe this function...
   */
  function isSelected(index) {
    // Block#: .`OdvDU3D/%[wq(}jJG~
    if(_that.singlechoice_chosen == null) {
      return false;
    }
    // Block#: z]r4k3M;!jX8E/v%Ofx@
    if(_that.singlechoice_chosen == (com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(_that.singlechoice_form, 'options'))[index], 'name'))) {
      return true;
    }
    return false;
  }
  /**
   * Describe this function...
   */
  function resetRadioButtonsValues() {
    return new Promise(function(resolve, reject) {
      // Block#: #{gsPcm)Z2[T~;gU4d%Y
      _that.singlechoice_chosen = null;
      // Block#: QyIIE6+BKI@h3HqR9I`9
      com.fc.JavaScriptDistLib.ListView.saveTemplateCell('RadioButtons');
      com.fc.JavaScriptDistLib.ListView.removeAllCells('RadioButtons');
      on_listview_length_configured_RadioButtons();
    });
  }
  /**
   * Describe this function...
   */
  function getChoiceNum() {
    // Block#: W(5zoR4P]hIe;;[$m`*N
    if(_that.singlechoice_form == null) {
      return 0;
    }
    return(com.fc.JavaScriptDistLib.Dictionary.getDictValue(_that.singlechoice_form, 'options')).length;
  }
  /**
   * This will hide error message.
   */
  function hideError() {
    return new Promise(function(resolve, reject) {
      // Block#: }N(6DKS#9;!@0+x`_p;#
      $('[obj-name="ErrorMsg"]').hide();
    });
  }
  /**
   * This function will set error text given the provided
   * message. The error will show up right after the update.
   */
  function setError(message) {
    return new Promise(function(resolve, reject) {
      // Block#: 9!fwE1..,ln6b[1C9++v
      com.fc.JavaScriptDistLib.Label.setProperty["Text"]("ErrorMsg", (com.fc.JavaScriptDistLib.TextLib.convertToText(message))); // Block#: w|z*Kj/z-:7)qb6N.9Hp
      $('[obj-name="ErrorMsg"]').show();
    });
  }
  /**
   * If input requires a value, it will check if user selected a choice or not.
   */
  function isValid() {
    // Block#: 27Xs)+-sake0^RKl?bn4
    if((com.fc.JavaScriptDistLib.Dictionary.getDictValue(_that.singlechoice_form, 'required')) && _that.singlechoice_chosen == null) {
      return false;
    }
    return true;
  }
  // application does not work on IOS with "on application start".
  // Block#: G_fwfF`lz.HJ2))L,C7A
  function on_screen_showRadioButtonsScreen() {
    try {
      // Block#: 2jfn|;R{tAJSTqEb=agE
      setRadioButtons(com.fc.JavaScriptDistLib.Dictionary.createDictionary(['readOnly', 'name', 'options', 'type'], [false, 'Choose a color:', [com.fc.JavaScriptDistLib.Dictionary.createDictionary(['id', 'name'], ['Red', 'Red']), com.fc.JavaScriptDistLib.Dictionary.createDictionary(['id', 'name'], ['Yellow', 'Yellow']), com.fc.JavaScriptDistLib.Dictionary.createDictionary(['id', 'name'], ['Blue', 'Blue'])], 'radio-buttons'])).then(response => {;
      });
    } catch(e) {
      com.fc.JavaScriptDistLib.handleExceptionNative(e);
    }
  };
  $('[obj-name="RadioButtonsScreen"]').on('show', on_screen_showRadioButtonsScreen);
  com.fc.JavaScriptDistLib.Screen.screenDict['showRadioButtonsScreen'] = on_screen_showRadioButtonsScreen;
  // Block#: *-1*q`=;3lMIUq(x,NI-
  function on_listview_cell_configured_RadioBtnElement(RadioBtnElement, number) {
    try {
      // Block#: ,hcxE;uS}_%#NH+dp[Z=
      com.fc.JavaScriptDistLib.Label.setProperty["Text"]("RadioOption", (com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(_that.singlechoice_form, 'options'))[number], 'name'))); // Block#: 79i3]n)?$;$IB`l$a+(X
      if(isSelected(number)) {
        // Block#: ~Yc$r6_[{uPJ{Sqf#~?}
        com.fc.JavaScriptDistLib.Image.setProperty["Image"]("RadioIcon", (com.fc.JavaScriptDistLib.ImageLibrary.createImageFromResource("./img/checked.png")));
      } else {
        // Block#: y,*?Rb^m(1m*qDe+v5)=
        com.fc.JavaScriptDistLib.Image.setProperty["Image"]("RadioIcon", (com.fc.JavaScriptDistLib.ImageLibrary.createImageFromResource("./img/unchecked.png")));
      }
      // Block#: J5w,4.z~*ce{b#Os6xA_
      if(com.fc.JavaScriptDistLib.Dictionary.getDictValue(_that.singlechoice_form, 'readOnly')) {
        // Block#: JiP.PT%Pl7799}RK%Uov
        com.fc.JavaScriptDistLib.ListView.setProperty["Alpha"](RadioBtnElement, 50);
      } else {
        // Block#: |.+UQkG;XK%##Z{duP0L
        com.fc.JavaScriptDistLib.ListView.setProperty["Alpha"](RadioBtnElement, 100);
      }
    } catch(e) {
      com.fc.JavaScriptDistLib.handleExceptionNative(e);
    }
  };
  com.fc.JavaScriptDistLib.ListView.setConfigCallback('RadioBtnElement', on_listview_cell_configured_RadioBtnElement);
  // Block#: jo?Oo#UB2S*6O+J4KuNt
  function on_Button_click(e) {
    try {
      // Block#: P`Vj|ZCkwg%]/;XD1u(H
      com.fc.JavaScriptDistLib.Label.setProperty["Text"]("Label", (getRadioButtonsValue()));
      e.stopPropagation();
    } catch(e) {
      com.fc.JavaScriptDistLib.handleExceptionNative(e);
    }
  };
  $('[obj-name="Button"]').on('click', on_Button_click);
  // Block#: (U/IY;mnw@+LI-)RKeMG
  function on_listview_cell_clicked_RadioBtnElement(RadioBtnElement, number) {
    try {
      // Block#: CXG4lYA:qPMm8@sr]E*V
      if(!(com.fc.JavaScriptDistLib.Dictionary.getDictValue(_that.singlechoice_form, 'readOnly'))) {
        // Block#: 8s0%[R(WDaZ54sI8VTg*
        _that.singlechoice_chosen = (com.fc.JavaScriptDistLib.Dictionary.getDictValue((com.fc.JavaScriptDistLib.Dictionary.getDictValue(_that.singlechoice_form, 'options'))[number], 'name'));
        // Block#: ES/3qD5cnIf;ZuYHC$$0
        com.fc.JavaScriptDistLib.ListView.saveTemplateCell('RadioButtons');
        com.fc.JavaScriptDistLib.ListView.removeAllCells('RadioButtons');
        on_listview_length_configured_RadioButtons();
        // Block#: AT*/2w#7yVc)iS,}pJO@
        hideError().then(response => {;
        });
      }
    } catch(e) {
      com.fc.JavaScriptDistLib.handleExceptionNative(e);
    }
  }
  com.fc.JavaScriptDistLib.ListView.setClickCallback('RadioBtnElement', on_listview_cell_clicked_RadioBtnElement);
  // Block#: q1GOy4Q`cgQ2e40(O7d8
  function on_Button2_click(e) {
    try {
      // Block#: ;#x-(Leit@:k5R#r,6AS
      resetRadioButtonsValues().then(response => {;
      });
      // Block#: Hm(m8.)U5[FLVb-Hj60$
      com.fc.JavaScriptDistLib.Label.setProperty["Text"]("Label", (getRadioButtonsValue()));
      e.stopPropagation();
    } catch(e) {
      com.fc.JavaScriptDistLib.handleExceptionNative(e);
    }
  };
  $('[obj-name="Button2"]').on('click', on_Button2_click);
  // Block#: o34rL]Kq2N9/xW1L@Nm2
  function on_listview_length_configured_RadioButtons() {
    try {
      com.fc.JavaScriptDistLib.ListView.configureCells('RadioButtons', getChoiceNum());
      $('[obj-name="RadioButtons"]').children().each(function(i) {
        if(i >= 0) {
          com.fc.JavaScriptDistLib.ListView.setContext($(this));
          com.fc.JavaScriptDistLib.ListView.executeConfigCallback('RadioButtons', $(this), i);
          com.fc.JavaScriptDistLib.ListView.executeConfigHeightCallback('RadioButtons', $(this), i);
          com.fc.JavaScriptDistLib.ListView.resetContext($(this));
        }
      });
    } catch(e) {
      com.fc.JavaScriptDistLib.handleExceptionNative(e);
    }
  };
  $('[obj-name="RadioButtonsScreen"]').show();
});
// Generated by snapp
// 590955-339681-47300-566909
