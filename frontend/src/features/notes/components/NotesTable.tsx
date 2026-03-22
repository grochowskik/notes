'use client';

import { useNoteDelete, useNotesList } from '@/core/api/notes/hooks';
import { Icon, Table } from '@/ui';

export function NotesTable() {
  const { data } = useNotesList({
    title: '',
    filters: { page: 2, page_size: 1, sort: 'title' },
  });
  const { mutate: deleteNote } = useNoteDelete();
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Content</Table.HeaderCell>
          <Table.HeaderCell>Version</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data?.notes.map((note) => (
          <Table.Row key={note.id}>
            <Table.Cell>{note.title}</Table.Cell>
            <Table.Cell>{note.content}</Table.Cell>
            <Table.Cell>{note.version}</Table.Cell>
            <Table.Cell>
              <Icon name="trash" onClick={() => deleteNote({ id: note.id })} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
