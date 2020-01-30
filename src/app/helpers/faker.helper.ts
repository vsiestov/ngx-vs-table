import { build, fake } from 'test-data-bot';

export const userBuilder = build('User').fields({
  toggle: false,
  id: fake(f => f.random.number()),
  firstName: fake(f => f.name.firstName()),
  lastName: fake(f => f.name.lastName()),
  email: fake(f => f.internet.email()),
  age: fake(f => f.random.number(100)),
  company: fake(f => f.company.companyName()),
  department: fake(f => f.commerce.department())
});

export const taskBuilder = build('Task').fields({
  checked: false,
  id: fake(f => f.random.number()),
  title: fake(f => f.lorem.words()),
  person: {
    name: fake(f => f.name.findName()),
    picture: fake(f => f.image.avatar())
  },
  status: {
    id: 1,
    name: 'todo'
  },
  priority: 'middle'
});
