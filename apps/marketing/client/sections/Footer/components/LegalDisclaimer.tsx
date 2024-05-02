import classNames from 'classnames';

export function LegalDisclaimer() {
  return (
    <div
      className={classNames(
        'text-white-700 text-2xs flex h-full flex-col',
        'sm:text-xs',
        'md:items-start md:justify-end md:text-left',
      )}
    >
      <p>Vertex is not available to Restricted Persons and US Persons.</p>
      <p>Please see our Terms of Service for further information.</p>
    </div>
  );
}
