const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
function setMenu(open) {
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  mobileMenu.hidden = !open;
  document.body.classList.toggle('menu-open', open);
}
menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
mobileMenu.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileMenu.hidden) { setMenu(false); menuToggle.focus(); }
});
window.matchMedia('(min-width: 681px)').addEventListener('change', event => { if(event.matches) setMenu(false); });

const copyButton = document.querySelector('.copy-email');
const copyStatus = document.querySelector('.copy-status');
let copyReset;
copyButton.addEventListener('click', async () => {
  clearTimeout(copyReset);
  try {
    await navigator.clipboard.writeText('ansazaheer07@gmail.com');
    copyStatus.textContent = 'Email address copied.';
    copyButton.querySelector('use').setAttribute('href', '#check');
    copyButton.setAttribute('aria-label', 'Email address copied');
    copyReset = setTimeout(() => {
      copyStatus.textContent = '';
      copyButton.querySelector('use').setAttribute('href', '#copy');
      copyButton.setAttribute('aria-label', 'Copy email address');
    }, 3000);
  } catch {
    copyButton.querySelector('use').setAttribute('href', '#copy');
    copyButton.setAttribute('aria-label', 'Copy email address');
    copyStatus.textContent = 'Please select the email address to copy it.';
  }
});

const navigationLinks = document.querySelectorAll('.desktop-nav a');
const trackedSections = Array.from(navigationLinks).map(link => document.querySelector(link.getAttribute('href')));
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navigationLinks.forEach(link => {
          if (link.getAttribute('href') === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
    });
  }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
  trackedSections.forEach(section => { if (section) sectionObserver.observe(section); });
  const heroObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) navigationLinks.forEach(link => link.removeAttribute('aria-current'));
  }, { threshold: .3 });
  heroObserver.observe(document.querySelector('.hero'));
}
