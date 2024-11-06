import { langs } from '@uiw/codemirror-extensions-langs';
import ReactCodeMirror, {
  basicSetup,
  ReactCodeMirrorProps,
  ReactCodeMirrorRef,
} from '@uiw/react-codemirror';
import { joinClassNames } from '@vertex-protocol/web-common';
import { CARD_ROUNDED_CLASSNAMES } from '@vertex-protocol/web-ui';
import { forwardRef } from 'react';

export const JSONCodeEditor = forwardRef<
  ReactCodeMirrorRef,
  ReactCodeMirrorProps
>(function JSONCodeEditor({ className, theme, extensions, ...restProps }, ref) {
  return (
    <ReactCodeMirror
      ref={ref}
      className={joinClassNames(
        CARD_ROUNDED_CLASSNAMES,
        'overflow-hidden',
        className,
      )}
      theme={theme ?? 'dark'}
      extensions={extensions ?? [basicSetup(), langs.json()]}
      {...restProps}
    />
  );
});
