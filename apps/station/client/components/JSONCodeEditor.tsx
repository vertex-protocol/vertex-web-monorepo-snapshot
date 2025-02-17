import { langs } from '@uiw/codemirror-extensions-langs';
import ReactCodeMirror, {
  basicSetup,
  ReactCodeMirrorProps,
  ReactCodeMirrorRef,
} from '@uiw/react-codemirror';
import { joinClassNames, WithRef } from '@vertex-protocol/web-common';
import { CARD_ROUNDED_CLASSNAMES } from '@vertex-protocol/web-ui';

export function JSONCodeEditor({
  className,
  theme,
  extensions,
  ...restProps
}: WithRef<ReactCodeMirrorProps, ReactCodeMirrorRef>) {
  return (
    <ReactCodeMirror
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
}
