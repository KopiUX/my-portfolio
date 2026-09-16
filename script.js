const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');
burger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
}));

const sections = ['home','about','project','contact'].map(id => document.getElementById(id));
const navLinks = document.querySelectorAll('#nav-links a');
const spy = () => {
  let current = sections[0].id;
  const y = window.scrollY + 120;
  sections.forEach(sec => { if (sec.offsetTop <= y) current = sec.id; });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
};
document.addEventListener('scroll', spy, { passive:true });
spy();

const filterBtns = document.querySelectorAll('.filter-btn');
const projCards = document.querySelectorAll('.proj-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    projCards.forEach(card => {
      card.classList.toggle('hide', f !== 'all' && card.dataset.cat !== f);
    });
  });
});

const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('cf-name').value;
  const email = document.getElementById('cf-email').value;
  const message = document.getElementById('cf-message').value;
  const target = 'your.email@gmail.com';
  const subject = encodeURIComponent('Portfolio contact from ' + name);
  const body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
  window.location.href = `mailto:${target}?subject=${subject}&body=${body}`;
});