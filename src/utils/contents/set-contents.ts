export function setContents() {
  const contents = document.getElementById('contents') as HTMLElement;

  // const _p = contents?.querySelectorAll('p');
  const _iframe: any = contents?.querySelectorAll('p iframe');
  const _image: any = contents?.querySelectorAll('picture img');
  const _picture: any = contents?.querySelectorAll('p picture');
  // const _table: any = contents?.getElementsByTagName('table');

  if (_image) {
    for (let i = 0; i < _image.length; i++) {
      if (_image[i]) {
        const _height: any = _image[i].getAttribute('height');
        const _width: any = _image[i].getAttribute('width');
        const _style: any = _image[i].getAttribute('style');

        const _newStyle = `
            display: block !important;
            width: 100% !important;
            height: 100% !important;
            margin: auto;
            margin-top: 15px;
            max-height: ${_height > 0 && _height !== '100%' ? `${_height}px` : '100%'} !important;
            max-width: ${_width > 0 && _width !== '100%' ? `${_width}px` : '100%'} !important;
          `;
        const _n = _style ? `${_style || ''}${_newStyle}` : _newStyle;
        _image[i].setAttribute('style', _n);

        if (_picture[i]) {
          const _img = _picture[i].getElementsByTagName('img')[0];

          if (_img) {
            const _caption: any = document.createElement('span');
            const _class: any = _img.getAttribute('class');
            const _showcaption = _class.search('showcaption-true') !== -1;
            if (_caption) {
              _caption.className = 'image-caption';
              _caption.style = `
                  display: block !important;
                  max-width: ${_width > 0 && _width !== '100%' ? `${_width}px` : '100%'} !important;
                  margin: 15px auto !important;
                  text-align: center;
                  `;
              _caption.innerHTML = _image[i].alt || null;
              if (_showcaption) {
                _picture[i].insertAdjacentElement('beforeend', _caption);
              }
            }
          }
        }
      }
    }
  }

  if (_iframe) {
    for (let i = 0; i < _iframe.length; i++) {
      if (_iframe[i]) {
        const _width: any = _iframe[i].getAttribute('width');
        const _height: any = _iframe[i].getAttribute('height');
        _iframe[i].setAttribute(
          'style',
          `
              display: block !important;
              position: relative !important;
              margin: 15px auto !important;
              width: 100% !important;
              height: 100% !important;
              min-height: ${_height > 0 && _height !== '100%' ? `${_height}px` : '480px'} !important;
              max-width: ${_width > 0 && _width !== '100%' ? `${_width}px` : '100%'} !important;
              max-height: ${_height > 0 && _height !== '100%' ? `${_height}px` : '100%'} !important;
            `
        );
      }
    }
  }

  // scroll table
  // if (_table) {
  //   for (let i = 0; i < _table.length; i++) {
  //     if (_table[i]) {
  //       const _div = document.createElement('div');
  //       _div.setAttribute('style', 'overflow-x:auto;');
  //       const _TableScroll: any = _table[i].insertAdjacentElement('beforebegin', _div);
  //       // retrun
  //       _table[i].setAttribute('style', 'width:540px; margin: auto;');
  //       _TableScroll.append(_table[i]);
  //     }
  //   }
  // }
}
